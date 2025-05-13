import { Input, Form, Typography, Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/PrimaryButton';
import { AuthLayout } from '../components/AuthLayout';

const { Title } = Typography;

export const ForgetPassword = () => {
  const [email, setemail] = useState('');
  const navigate = useNavigate();

  const handlelForgetPassword = () => {
    navigate('/verification');
  };
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const { role } = JSON.parse(user);
      navigate(`/${role}/dashboard`);
    }
  }, []);

  return (
    <AuthLayout>
      <Card
        variant="outlined"
        style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          My Account
        </Title>
        <p style={{ textAlign: 'center' }}>
          <strong>Let Us Help You</strong>
        </p>
        <Form layout="vertical" onFinish={handlelForgetPassword}>
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
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <PrimaryButton htmlType="submit" style={{ width: '200px' }}>
              Reset My Password
            </PrimaryButton>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Back to{' '}
            <Link className="link" to="/login">
              Login?
            </Link>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};
