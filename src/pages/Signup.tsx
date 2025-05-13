import { Input, Form, Typography, Card, Select, Button } from 'antd';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { PrimaryButton } from '../components/PrimaryButton';

const { Title } = Typography;
const { Option } = Select;

export const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignup = (values: any) => {
    const { email, password, confirmPassword, role } = values;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    localStorage.setItem(
      'registeredUser',
      JSON.stringify({ email, password, role })
    );
    alert('Signup successful. Please login.');
    navigate('/login');
  };

  const loginWithGoogle = () => {
    alert('Google login not implemented.');
  };

  const loginWithFacebook = () => {
    alert('Facebook login not implemented.');
  };

  return (
    <AuthLayout>
      <Card variant="outlined" style={{}}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Sign Up
        </Title>
        <p style={{ textAlign: 'center' }}>
          <strong>Enter details to create your account</strong>
        </p>
        <Form layout="vertical" form={form} onFinish={handleSignup}>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            initialValue="patient"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="doctor">Doctor</Option>
              <Option value="patient">Patient</Option>
            </Select>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <PrimaryButton
              htmlType="submit"
              style={{ width: '250px', marginTop: '10px' }}
            >
              Sign Up
            </PrimaryButton>
          </Form.Item>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            Or continue with
          </div>{' '}
          <div style={{ display: 'flex', gap: 10 }}>
            <Button icon={<GoogleOutlined />} block onClick={loginWithGoogle}>
              Google
            </Button>
            <Button
              icon={<FacebookFilled />}
              block
              onClick={loginWithFacebook}
              style={{ backgroundColor: '#3b5998', color: '#fff' }}
            >
              Facebook
            </Button>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};
