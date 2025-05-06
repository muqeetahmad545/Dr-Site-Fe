// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const Login=()=> {
//   const [username, setUsername] = useState('');
//   const [role, setRole] = useState('user');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Fake auth: save to localStorage
//     localStorage.setItem('user', JSON.stringify({ username, role }));

//     // Redirect based on role
//     if (role === 'admin') navigate('/admin');
//     else if (role === 'doctor') navigate('/doctor');
//     else navigate('/user');
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         style={{ display: 'block', marginBottom: '1rem' }}
//       />
//       <select value={role} onChange={e => setRole(e.target.value)} style={{ marginBottom: '1rem' }}>
//         <option value="user">User</option>
//         <option value="doctor">Doctor</option>
//         <option value="admin">Admin</option>
//       </select>
//       <br />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }


import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ username, role }));
    navigate(`/${role}/dashboard`);
  };

  return (
    <div style={{ maxWidth: 300, margin: '5rem auto' }}>
      <h2>Login</h2>
      <Input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Select value={role} onChange={value => setRole(value)} style={{ width: '100%', marginBottom: 10 }}>
        <Option value="admin">Admin</Option>
        <Option value="doctor">Doctor</Option>
        <Option value="patient">Patient</Option>
      </Select>
      <Button type="primary" block onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}
