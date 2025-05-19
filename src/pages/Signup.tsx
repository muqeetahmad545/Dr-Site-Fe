import { Input, Form, Typography, Card, Select, Button, message } from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { PrimaryButton } from "../components/PrimaryButton";
import { useCreateAccountMutation } from "../features/api/auth/authAPI";
import type { APIError } from "../types/error";

const { Title } = Typography;
const { Option } = Select;

export const SignupPage = () => {
  const [createAccount, { isLoading, error }] = useCreateAccountMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const selectedRole = Form.useWatch("role", form);

  const handleSignup = async (values: any) => {
    const { email, role } = values;
    try {
       await createAccount({ email, role }).unwrap();
      // localStorage.setItem("registeredUser", JSON.stringify({ email, role }));
      message.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      console.error("Signup failed:", err.data.message);
      console.log("err", err.data.message);
      message.error(err.data.message);
    }
  };

  const loginWithGoogle = () => {
    alert("Google login not implemented.");
  };

  const loginWithFacebook = () => {
    alert("Facebook login not implemented.");
  };

  return (
    <AuthLayout>
      <Card variant="outlined" style={{}}>
        <Title level={3} style={{ textAlign: "center" }}>
          Sign Up
        </Title>
        <p style={{ textAlign: "center" }}>
          <strong>Enter details to create your account</strong>
        </p>
        {error && (
          <div style={{ color: "red", textAlign: "center", marginBottom: 12 }}>
            {(error as APIError).data?.message || "Signup failed"}
          </div>
        )}

        <Form layout="vertical" form={form} onFinish={handleSignup}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input />
          </Form.Item>
       
          {/* <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm password' }]}
          >
            <Input.Password />
          </Form.Item> */}
          <Form.Item
            label="Role"
            name="role"
            initialValue="patient"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="doctor">Doctor</Option>
              <Option value="patient">Patient</Option>
            </Select>
          </Form.Item>
            {selectedRole === "doctor" && (
            <Form.Item
              label="IMC Number"
              name="imc"
              rules={[{ required: true, message: "IMC Number is required" }]}
            >
              <Input />
            </Form.Item>
          )}
          <div style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <PrimaryButton
              htmlType="submit"
              loading={isLoading}
              style={{ width: "250px", marginTop: "10px" }}
            >
              Sign Up
            </PrimaryButton>
          </Form.Item>
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            Or continue with
          </div>{" "}
          <div style={{ display: "flex", gap: 10 }}>
            <Button icon={<GoogleOutlined />} block onClick={loginWithGoogle}>
              Google
            </Button>
            <Button
              icon={<FacebookFilled />}
              block
              onClick={loginWithFacebook}
              style={{ backgroundColor: "#3b5998", color: "#fff" }}
            >
              Facebook
            </Button>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};
