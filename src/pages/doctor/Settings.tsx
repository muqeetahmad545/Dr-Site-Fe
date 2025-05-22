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
import Avaibilty from "../ProfileSetup/Avaibilty";
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

  console.log("isTokenVerified", isTokenVerified);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [verifyToken] = useVerifyTokenMutation();
  const tokenChecked = useRef(false);
  const { data: profile, refetch } = userProfile();

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
            navigate("/login");
          }
        });
    } else {
      setIsTokenVerified(true);
    }
  }, [location.pathname, navigate, verifyToken]);

  useEffect(() => {
    if (profile?.data) {
      const doctor = profile.data.doctor || {};

      const education = Array.isArray(doctor.education)
        ? doctor.education
        : doctor.education
        ? [doctor.education]
        : [];

      const insurance = Array.isArray(doctor.insurance)
        ? doctor.insurance
        : doctor.insurance
        ? [doctor.insurance]
        : [];

      setFormData({
        first_name: profile.data.first_name || "",
        profile_image: profile.data.profile_image || "",
        last_name: profile.data.last_name || "",
        email: profile.data.email || "",
        phone: profile.data.phone || "",
        address: profile.data.address || "",
        passport_number: profile.data.passport_number || "",
        address_document: profile.data.address_document || "",
        status: profile.data.status || "",
        gender: profile.data.gender || "",

        imc: doctor.imc || "",
        specialization: doctor.specialization || "",
        available_days: doctor.available_days || [],
        available_times: doctor.available_times || [],

        education: education.map((edu: any) => ({
          degree_name: edu.degree_name,
          institution_name: edu.institution_name,
          degree_document: edu.degree_document,
        })),

        insurance: insurance.map((ins: any) => ({
          insurance_number: ins.insurance_number,
          insurance_company: ins.insurance_company,
          insurance_document: ins.insurance_document,
        })),
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
      title: "Avaibilty Details",
      content: (
        <Avaibilty form={form} formData={formData} setFormData={setFormData} />
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

  // const next = () => setCurrent((prev) => prev + 1);
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
    const payload = {
      profile_image: formData.profile_image,
      first_name: formData.first_name,
      last_name: formData.last_name,
      gender: formData.gender,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      passport_number: formData.passport_number,
      address_document: formData.address_document || "",
      status: formData.status,
      doctor: {
        imc: formData.imc,
        specialization: formData.specialization,
        available_days: formData.available_days || [],
        available_times: formData.available_times || [],
        education:
          formData.education?.map((item: any) => ({
            degree_name: item.degree_name,
            institution_name: item.institution_name,
            degree_document: item.degree_document || "Dummy document",
          })) || [],
        insurance:
          formData.insurance?.map((item: any) => ({
            insurance_number: item.insurance_number,
            insurance_company: item.insurance_company,
            insurance_document: item.insurance_document || "Dummy document",
          })) || [],
      },
    };

    try {
      const response = await updateProfile(payload).unwrap();
      message.success(response.message);
      refetch();
      // navigate("/login");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message?.message ||
        err?.data?.message ||
        err?.message ||
        "Profile update failed";
      message.error(errorMessage);
    }
  };

  // ✅ Show loader while verifying token or loading profile
  if (isPageLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card title="Profile Setup" style={{ margin: "0" }}>
      <Steps current={current} style={{ marginBottom: 24 }}>
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
