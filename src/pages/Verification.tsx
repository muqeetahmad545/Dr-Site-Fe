import { Input, Form, Typography, Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { PrimaryButton } from '../components/PrimaryButton';

const { Title } = Typography;

export const Verification = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handlelVerify = () => {
    navigate('/login');
  };

  return (
    <AuthLayout>
      <Card style={{ maxWidth: 450, margin: '0 auto' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Verification
        </Title>
        <p style={{ textAlign: 'center' }}>
          <strong>Enter the OTP and reset your account password</strong>
        </p>
        <Form layout="vertical" form={form} onFinish={handlelVerify}>
          <Form.Item
            label="OTP"
            name="otp"
            rules={[
              { required: true, message: 'OTP is required' },
              {
                pattern: /^\d{6}$/,
                message: 'OTP must be a 6-digit number',
              },
            ]}
          >
            <Input maxLength={6} placeholder="Enter 6-digit OTP" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-enter new password" />
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Back to?{' '}
            <Link className="link" to="/login">
              Login
            </Link>
          </div>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <PrimaryButton
              htmlType="submit"
              style={{ width: '250px', marginTop: '10px' }}
            >
              Submit
            </PrimaryButton>
          </Form.Item>
        </Form>
      </Card>
    </AuthLayout>
  );
};
