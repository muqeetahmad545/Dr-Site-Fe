import React, { useEffect, useRef, useState } from "react";
import { Steps, message, Card, Form } from "antd";
import PersonalInfo from "./ProfileSetup/PersonalInfo";
import Availability from "./ProfileSetup/Availability";
import EducationDetails from "./ProfileSetup/EducationDetails";
import KycDetails from "./ProfileSetup/KycDetails";
import { PrimaryButton } from "../components/PrimaryButton";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useVerifyTokenMutation,
} from "../features/api/auth/authAPI";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const { Step } = Steps;

const ProfileSetup: React.FC = () => {
  const location = useLocation();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [verifyToken] = useVerifyTokenMutation();
  const tokenVerifiedOnce = useRef(false);
  const [tokenReady, setTokenReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !tokenReady,
  });
  useEffect(() => {
    const pathname = location.pathname;
    const isTokenRoute = pathname.startsWith("/profile-setup/");
    const token = isTokenRoute ? pathname.split("/profile-setup/")[1] : null;

    if (token && !tokenVerifiedOnce.current) {
      tokenVerifiedOnce.current = true;

      verifyToken(token)
        .unwrap()
        .then((res) => {
          const verifiedToken: any = res.data;
          localStorage.setItem("token", verifiedToken);

          try {
            const decodedToken = JSON.parse(atob(verifiedToken.split(".")[1]));
            localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
          } catch (e) {
            console.error("Failed to decode token", e);
          }

          message.success("Email verified successfully!");

          setTokenReady(true);

          setTimeout(() => navigate("/profile-setup"), 500);
        })
        .catch((err) => {
          const msg = err?.data?.message;

          if (msg === "email already verified") {
            message.warning("Email already verified. Please log in.");
            setTimeout(() => navigate("/login"), 1000);
          } else {
            message.error("Invalid or expired verification token.");
            navigate("/login");
          }
        });
    } else if (!token && !tokenVerifiedOnce.current) {
      tokenVerifiedOnce.current = true;
      setTokenReady(true);
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

      setIsLoading(false);
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
      title: "Kyc Details",
      content: (
        <KycDetails form={form} formData={formData} setFormData={setFormData} />
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent((prev) => prev + 1);
    } catch (error) {
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
      navigate("/doctor/dashboard");
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card title="Profile Setup" style={{ margin: "2rem" }}>
      <Steps current={current} style={{ marginBottom: 24 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ minHeight: 200, padding: 24 }}>
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24, textAlign: "right" }}>
        {current > 0 && (
          <PrimaryButton onClick={prev} style={{ marginRight: 8 }}>
            Previous
          </PrimaryButton>
        )}
        {current < steps.length - 1 && (
          <PrimaryButton onClick={next}>Next</PrimaryButton>
        )}
        {current === steps.length - 1 && (
          <PrimaryButton onClick={handleFinish} loading={isUpdating}>
            Finish
          </PrimaryButton>
        )}
      </div>
    </Card>
  );
};

export default ProfileSetup;
