import { Input, Form, Typography, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { PrimaryButton } from "../components/PrimaryButton";
import { useResetPasswordMutation } from "../features/api/auth/authApi";
import type { APIError } from "../types/error";

const { Title } = Typography;

export const Verification = () => {
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleVerify = async (values: { otp: string; password: string }) => {
    try {
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        message.error("No email found. Please go back and enter your email.");
        return;
      }
      const res = await resetPassword({
        email,
        otp: values.otp,
        password: values.password,
      }).unwrap();
      localStorage.removeItem("resetEmail");
      message.success(res?.message || "OTP verified successfully");
      navigate("/login");
    } catch (err: any) {
      console.error("Verification failed:", err);

      const errorMsg =
        "data" in err && err.data?.message
          ? err.data.message
          : "Verification failed";
      message.error(errorMsg);
    }
  };

  return (
    <AuthLayout>
      <Card style={{ maxWidth: 450, margin: "0 auto" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Verification
        </Title>
        <p style={{ textAlign: "center" }}>
          <strong>Enter the OTP and reset your account password</strong>
        </p>

        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            {(error as APIError).data?.message || "Invalid otp reset failed"}
          </div>
        )}
        {/* ✅ Error Display (optional but clear) */}
        <Form layout="vertical" form={form} onFinish={handleVerify}>
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              { required: true, message: "OTP is required" },
              {
                pattern: /^\d{6}$/,
                message: "OTP must be a 6-digit number",
              },
            ]}
          >
            <Input maxLength={6} placeholder="Enter 6-digit OTP" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter new password" />
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            Back to?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </div>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <PrimaryButton
              htmlType="submit"
              style={{ width: "250px", marginTop: "10px" }}
              loading={isLoading}
            >
              Submit
            </PrimaryButton>
          </Form.Item>
        </Form>
      </Card>
    </AuthLayout>
  );
};
