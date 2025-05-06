import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../constants/theme';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Button
      danger
      onClick={handleLogout}
      style={{
        backgroundColor: COLORS.danger,
        borderColor: COLORS.danger,
        color: '#fff',
        width: '100%',
        maxWidth: 200,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#cc393d';
        (e.currentTarget as HTMLElement).style.borderColor = '#cc393d';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.danger;
        (e.currentTarget as HTMLElement).style.borderColor = COLORS.danger;
      }}
    >
      Logout
    </Button>
  );
};
