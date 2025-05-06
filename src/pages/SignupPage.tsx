import {  Input, Form, Typography, Card, Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { PrimaryButton } from "../components/PrimaryButton";

const { Title } = Typography;
const { Option } = Select;

export const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignup = (values: any) => {
    const { email, password, confirmPassword, role } = values;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ email, password, role })
    );
    alert("Signup successful. Please login.");
    navigate("/login");
  };

  return (
    <AuthLayout>
      <Card
        variant="outlined"
        style={{ width: 400, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Sign Up
        </Title>
        <Form layout="vertical" form={form} onFinish={handleSignup}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            initialValue="patient"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="doctor">Doctor</Option>
              <Option value="patient">Patient</Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'center',  }}>
            <PrimaryButton htmlType="submit" style={{width:'250px'}}>
              Login
            </PrimaryButton>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};
