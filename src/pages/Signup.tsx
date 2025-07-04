import { Input, Form, Typography, Card, Select, message } from "antd";
// import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { PrimaryButton } from "../components/PrimaryButton";
import { useCreateAccountMutation } from "../features/api/auth/authApi";
import type { APIError } from "../types/error";

const { Title } = Typography;
const { Option } = Select;

export const SignupPage = () => {
  const [createAccount, { isLoading, error }] = useCreateAccountMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignup = async (values: any) => {
    const { email, password } = values;
    // Ensure role is set to "doctor" before sending data
    const role = "doctor";
    try {
      const response = await createAccount({
        email,
        password,
        role,
      }).unwrap();
      message.success(response.message);
      navigate("/login");
    } catch (err: any) {
      console.error("Signup failed:", err.data.message);
      message.error(err.data.message);
    }
  };

  // const loginWithGoogle = () => {
  //   alert("Google login not implemented.");
  // };

  // const loginWithFacebook = () => {
  //   alert("Facebook login not implemented.");
  // };

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
          {/* <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "first_name is required" }]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "last_name is required" }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return value === getFieldValue("password")
                    ? Promise.resolve()
                    : Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            initialValue="doctor"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select disabled>
              <Option value="doctor">Doctor</Option>
            </Select>
          </Form.Item>
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
          {/* <div style={{ marginBottom: "10px", textAlign: "center" }}>
            Or continue with
          </div>{" "} */}
          {/* <div style={{ display: "flex", gap: 10 }}>
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
          </div> */}
        </Form>
      </Card>
    </AuthLayout>
  );
};
