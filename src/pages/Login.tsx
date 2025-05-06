import { Button, Input, Form, Typography, Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { signInWithPopup } from 'firebase/auth';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { auth, facebookProvider, googleProvider } from '../firebase';
import { PrimaryButton } from '../components/PrimaryButton';  // Make sure to import the PrimaryButton component

const { Title } = Typography;

export const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem('registeredUser') || '{}');
    if (email === userData.email && password === userData.password) {
      localStorage.setItem('user', JSON.stringify({ email, role: userData.role || 'patient' }));
      navigate(`/${userData.role || 'patient'}/dashboard`);
    } else {
      alert('Invalid credentials');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: 'patient' }));
      navigate('/patient/dashboard');
    } catch (error) {
      console.error(error);
      alert('Google login failed');
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: 'patient' }));
      navigate('/patient/dashboard');
    } catch (error) {
      console.error(error);
      alert('Facebook login failed');
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
        <Title level={3} style={{ textAlign: 'center' }}>Login</Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input value={email} onChange={e => setemail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item>
          {/* Centered Button */}
          <Form.Item style={{ display: 'flex', justifyContent: 'center',  }}>
            <PrimaryButton htmlType="submit" style={{width:'250px'}}>
              Login
            </PrimaryButton>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          Or continue with
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <Button
            icon={<GoogleOutlined />}
            block
            onClick={loginWithGoogle}
          >
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

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Card>
    </AuthLayout>
  );
};
