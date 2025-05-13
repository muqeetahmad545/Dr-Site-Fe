import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import '../css/Layout.css';
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ProfileOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  // PhoneOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { Header } from './Header';
import { LogoutButton } from './LogoutButton';
import logo from '../assets/logo.png';
import type { User } from '../types/user';

interface Props {
  role: 'admin' | 'doctor' | 'patient';
}

interface NavLinkItem {
  to?: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavLinkItem[];
}

export const DashboardLayout: React.FC<Props> = ({ role }) => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [openMenus, setOpenMenus] = useState<{ [label: string]: boolean }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const route = location.pathname.split('/').pop();
  const titles: { [key: string]: string } = {
    dashboard: 'Dashboard',
    settings: 'Settings',
    patient: 'Patients',
    schedule: 'Schedule',
    appointments: 'Appointments',
    doctors: 'Doctors List',
    addDoctor: 'Add Doctor',
    patients: 'Patients List',
    addPatient: 'Add Patient',
    healthOverview: 'Health Overview',
    'all-appointments': 'Appointments List',
  };

  const title = titles[route || 'dashboard'];

  const links: Record<'admin' | 'doctor' | 'patient', NavLinkItem[]> = {
    admin: [
      { to: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
      {
        label: 'Doctors',
        icon: <UserOutlined />,
        children: [
          { to: 'doctors', label: 'Doctor List' },
          // { to: "add-doctor", label: "Add Doctor" },
        ],
      },
      {
        label: 'Patients',
        icon: <TeamOutlined />,
        children: [
          { to: 'patients', label: 'Patient List' },
          // { to: "add-patient", label: "Add Patient" },
        ],
      },
      {
        to: 'all-appointments',
        label: 'Appointments',
        icon: <ProfileOutlined />,
      },
      { to: 'settings', label: 'Settings', icon: <SettingOutlined /> },
    ],
    doctor: [
      { to: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
      { to: 'patient', label: 'Patient', icon: <TeamOutlined /> },
      { to: 'schedule', label: 'Schedule', icon: <CalendarOutlined /> },
      { to: 'settings', label: 'Settings', icon: <SettingOutlined /> },
    ],
    patient: [
      { to: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
      {
        to: 'healthOverview',
        label: 'Health Overview',
        icon: <MedicineBoxOutlined />,
      },
      { to: 'appointments', label: 'Appointments', icon: <ProfileOutlined /> },
      { to: 'settings', label: 'Settings', icon: <SettingOutlined /> },
    ],
  };

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="app-logo" />
          <strong>Cliniva</strong>
        </div>

        <h2 className="panel-title">
          {role.charAt(0).toUpperCase() + role.slice(1)} Panel
        </h2>

        {user && (
          <div className="user-info">
            <div className="avatar-container">
              <Avatar
                size={64}
                src={user.image || '/default-avatar.png'}
                icon={<UserOutlined />}
              />
            </div>
            <div className="user-name">{user.name || 'Jhon'}</div>
            <div className="user-role">{user.role.toUpperCase()}</div>
          </div>
        )}

        <nav className="nav-menu">
          {links[role].map((link) =>
            link.children ? (
              <div key={link.label} className="nav-submenu">
                <div
                  className="nav-link submenu-toggle"
                  onClick={() => toggleMenu(link.label)}
                >
                  <span className="icon">{link.icon}</span>
                  <span className="label">{link.label}</span>
                  <DownOutlined className="submenu-arrow" />
                </div>
                {openMenus[link.label] && (
                  <div className="submenu-items">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to!}
                        className={({ isActive }) =>
                          isActive
                            ? 'nav-link sub-link active'
                            : 'nav-link sub-link'
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to!}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="sidebar-bottom">
          {/* <div className="emergency-contact-card">
            <h4>Emergency Contact</h4>
            <p>
              <PhoneOutlined
                style={{ marginRight: '8px', color: 'var(--color-success)' }}
              />
              0987654321
            </p>
          </div> */}
          <div className="logout-container">
            <LogoutButton />
            <strong style={{ marginTop: '10px', display: 'block' }}>
              Cliniva Dashboard © 2025
            </strong>
          </div>
        </div>
      </aside>

      <div className="main-area">
        <Header title={title} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
