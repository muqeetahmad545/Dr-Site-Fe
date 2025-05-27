import React, { useEffect, useRef, useState } from "react";
import { Steps, message, Card, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PrimaryButton } from "../../components/PrimaryButton";
import {
  useUpdateProfileMutation,
  useVerifyTokenMutation,
} from "../../features/api/auth/authAPI";
import { userProfile } from "../../hooks/userProfile";
import Availability from "../ProfileSetup/Availability";
import EducationDetails from "../ProfileSetup/EducationDetails";
import KycDetails from "../ProfileSetup/KycDetails";
import PersonalInfo from "../ProfileSetup/PersonalInfo";

const { Step } = Steps;

const ProfileSetup: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [verifyToken] = useVerifyTokenMutation();
  const tokenChecked = useRef(false);
  const { data: profile, refetch } = userProfile();

  console.log("isTokenVerified", isTokenVerified);

  useEffect(() => {
    const pathname = location.pathname;
    const isTokenRoute = pathname.startsWith("/profile-setup/");
    const token = isTokenRoute ? pathname.split("/profile-setup/")[1] : null;

    if (token && !tokenChecked.current) {
      tokenChecked.current = true;

      verifyToken(token)
        .unwrap()
        .then((res) => {
          const verifiedToken: any = res.data;
          localStorage.setItem("token", verifiedToken);

          try {
            const decodedToken = JSON.parse(atob(verifiedToken.split(".")[1]));
            localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
          } catch (e) {
            console.error("Token decode failed:", e);
          }

          message.success("Email verified successfully!");
          setIsTokenVerified(true);
        })
        .catch((err) => {
          const msg = err?.data?.message;

          if (msg === "email already verified") {
            message.warning("Email already verified. Please log in.");
            navigate("/login");
          } else {
            message.error("Invalid or expired verification token.");
            // navigate("/login");
          }
        });
    } else {
      setIsTokenVerified(true);
    }
  }, [location.pathname, navigate, verifyToken]);

  useEffect(() => {
    if (profile?.data) {
      const doctor = profile.data.doctor || {};
      const availObj =
        doctor.doctor_availabilities || doctor.available_days || {};

      setFormData({
        first_name: profile.data.first_name || "",
        profile_image: profile.data.profile_image || {},
        last_name: profile.data.last_name || "",
        email: profile.data.email || "",
        phone: profile.data.phone || "",
        address: profile.data.address || "",
        passport_number: profile.data.passport_number || "",
        address_document: profile.data.address_document || {},
        status: profile.data.status || "",
        gender: profile.data.gender || "",
        imc: doctor.imc || "",
        specialization: doctor.specialization || "",
        doctor_availabilities: availObj,
        doctor_availabilities_list: Object.keys(availObj || {}), // ✅ FIX
        education: Array.isArray(doctor.education)
          ? doctor.education.map((edu: any) => ({
              degree_name: edu.degree_name,
              institution_name: edu.institution_name,
              degree_document: edu.degree_document || {},
            }))
          : [],
        insurance: Array.isArray(doctor.insurance)
          ? doctor.insurance.map((ins: any) => ({
              insurance_number: ins.insurance_number,
              insurance_company: ins.insurance_company,
              insurance_document: ins.insurance_document || {},
            }))
          : [],

        insuranceCheckbox:
          Array.isArray(doctor.insurance) && doctor.insurance.length > 0,
      });

      setIsPageLoading(false);
    }
  }, [profile?.data]);

  const steps = [
    {
      title: "Personal Info",
      content: (
        <PersonalInfo
          form={form}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Availability Details",
      content: (
        <Availability
          form={form}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Education Details",
      content: (
        <EducationDetails
          form={form}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "KYC Details",
      content: (
        <KycDetails form={form} formData={formData} setFormData={setFormData} />
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent((prev) => prev + 1);
    } catch {
      message.error("Please fill all required fields before proceeding.");
    }
  };

  const prev = () => setCurrent((prev) => prev - 1);

  const handleFinish = async () => {
    try {
      await form.validateFields();
      const doctor_availabilities = formData.doctor_availabilities || {};

      const payload = {
        profile_image: formData.profile_image || { iv: "", data: "" },
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        passport_number: formData.passport_number,
        address_document: formData.address_document || { iv: "", data: "" },
        status: formData.status,
        doctor: {
          imc: formData.imc,
          specialization: formData.specialization,
          doctor_availabilities,
          education:
            formData.education?.map((item: any) => ({
              degree_name: item.degree_name,
              institution_name: item.institution_name,
              degree_document: item.degree_document || { iv: "", data: "" },
            })) || [],
          insurance:
            formData.insurance?.map((item: any) => ({
              insurance_number: item.insurance_number,
              insurance_company: item.insurance_company,
              insurance_document: item.insurance_document || {
                iv: "",
                data: "",
              },
            })) || [],
        },
      };

      const response = await updateProfile(payload).unwrap();
      message.success(response.message);
      refetch();
      setCurrent(0);
      // navigate("/login");
    } catch (err: any) {
      console.log("err", err);
      const errorMessage =
        err?.data?.message?.message ||
        err?.data?.message ||
        err?.message ||
        "Profile update failed";
      message.error(errorMessage);
    }
  };

  if (isPageLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card title="Profile Setup">
      <Steps
        current={current}
        onChange={(value) => setCurrent(value)}
        style={{ marginBottom: 24 }}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ minHeight: 200, padding: 24 }}>
        {steps[current].content}
      </div>
      <div style={{ textAlign: "right" }}>
        {current > 0 && (
          <PrimaryButton onClick={prev} style={{ marginRight: 8 }}>
            Previous
          </PrimaryButton>
        )}
        {current < steps.length - 1 && (
          <PrimaryButton onClick={next}>Next</PrimaryButton>
        )}
        {current === steps.length - 1 && (
          <PrimaryButton onClick={handleFinish} loading={isLoading}>
            Finish
          </PrimaryButton>
        )}
      </div>
    </Card>
  );
};

export default ProfileSetup;
