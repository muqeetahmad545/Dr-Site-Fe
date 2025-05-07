import { Button, Input, Form, Typography, Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/PrimaryButton';
import { AuthLayout } from '../components/AuthLayout';

const { Title } = Typography;

export const ForgetPassword = () => {
  const [email, setemail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    if (email === userData.email) {
      localStorage.setItem('user', JSON.stringify({ email, role: userData.role || 'patient' }));
      navigate(`/${userData.role || 'patient'}/dashboard`);
    } else {
      alert('Invalid credentials');
    }
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
      < Card  variant="outlined" style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ textAlign: 'center' }}>My Account</Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email Address" name="email" rules={[{ required: true }]}>
            <Input value={email} onChange={e => setemail(e.target.value)} />
          </Form.Item>
          {/* <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item> */}
          {/* Centered Button */}
          <Form.Item style={{ display: 'flex', justifyContent: 'center',  }}>
            <PrimaryButton htmlType="submit" style={{width:'200px'}}>
              Reset Password
            </PrimaryButton>
          </Form.Item>
        </Form>
      </Card>
      </AuthLayout>
  );
};
