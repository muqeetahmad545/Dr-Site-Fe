import { Input, Form, Typography, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { AuthLayout } from "../components/AuthLayout";
import { useForgotPasswordMutation } from "../features/api/auth/authAPI";
import type { APIError } from "../types/error";
const { Title } = Typography;

export const ForgetPassword = () => {
  const [forgetPassword, { isLoading, error }] = useForgotPasswordMutation();

  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handleForgetPassword = async () => {
    try {
      const res = await forgetPassword({ email }).unwrap();
      if (res?.message) {
        message.success(res.message);
      } else {
        message.success("OTP sent successfully");
      }
      localStorage.setItem("resetEmail", email);
      navigate("/verification");
    } catch (err: any) {
      console.error("Password reset failed:", err);

      const errorMsg =
        "data" in err && err.data?.message
          ? err.data.message
          : "Password reset failed";

      message.error(errorMsg);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { role } = JSON.parse(user);
      navigate(`/${role}/dashboard`);
    }
  }, []);

  return (
    <AuthLayout>
      <Card
        variant="outlined"
        style={{ width: 400, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          My Account
        </Title>
        <p style={{ textAlign: "center" }}>
          <strong>Let Us Help You</strong>
        </p>
        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            {(error as APIError).data?.message || "Password reset failed"}
          </div>
        )}
        <Form layout="vertical" onFinish={handleForgetPassword}>
          <Form.Item
            label="Enter your registered email address."
            name="email"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Email*"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <PrimaryButton
              htmlType="submit"
              loading={isLoading}
              style={{ width: "200px" }}
            >
              Reset My Password
            </PrimaryButton>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            Back to{" "}
            <Link className="link" to="/login">
              Login?
            </Link>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};
