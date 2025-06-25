import { Input, Form, Typography, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthLayout } from "../components/AuthLayout";
// import { signInWithPopup } from "firebase/auth";
// import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
// import { auth, facebookProvider, googleProvider } from "../firebase";
import { PrimaryButton } from "../components/PrimaryButton";
import { useLoginMutation } from "../features/api/auth/authApi";
import type { APIError } from "../types/error";

const { Title } = Typography;

export const LoginPage = () => {
  const [loginuser, { isLoading, error }] = useLoginMutation();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await loginuser({ email, password }).unwrap();
      const token = result.data;
      localStorage.setItem("token", token);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userRole = decodedToken.role || "patient";
      localStorage.setItem(
        "user",
        JSON.stringify({ email, role: userRole, token })
      );
      message.success("Login successful!");
      navigate(`/${userRole}/dashboard`);
    } catch (err: any) {
      console.error("Login failed:", err.data?.message);
      message.error(err.data?.message || "Login failed");
    }
  };

  // const loginWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;
  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({ email: user.email, role: "patient" })
  //     );
  //     navigate("/patient/dashboard");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Google login failed");
  //   }
  // };

  // const loginWithFacebook = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     const user = result.user;
  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({ email: user.email, role: "patient" })
  //     );
  //     navigate("/patient/dashboard");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Facebook login failed");
  //   }
  // };

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
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>
        <p style={{ textAlign: "center" }}>
          <strong>Welcome to Cliniva</strong>
        </p>
        {error && (
          <div style={{ color: "red", textAlign: "center", marginBottom: 12 }}>
            {(error as APIError).data?.message || "Login failed"}
          </div>
        )}

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true }]}
          >
            <Input value={email} onChange={(e) => setemail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <Link
              className="link"
              to="/forgot-password"
              style={{ fontSize: "0.9rem" }}
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <PrimaryButton
              htmlType="submit"
              loading={isLoading}
              style={{ width: "250px" }}
            >
              Login
            </PrimaryButton>
          </Form.Item>
        </Form>
        {/* <div style={{ marginTop: 16, textAlign: "center" }}>
          Or continue with
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
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

        <div style={{ textAlign: "center", marginTop: 24 }}>
          Don't have an account?{" "}
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </div>
      </Card>
    </AuthLayout>
  );
};
