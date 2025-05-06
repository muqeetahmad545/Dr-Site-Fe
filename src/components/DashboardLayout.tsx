// src/components/DashboardLayout.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../css/Layout.css';
import { LogoutButton } from './LogoutButton';

interface Props {
  role: 'admin' | 'doctor' | 'patient';
}

const DashboardLayout: React.FC<Props> = ({ role }) => {
  const links = {
    admin: [
      { to: 'dashboard', label: 'Dashboard' },
      { to: 'settings', label: 'Settings' },
    ],
    doctor: [
      { to: 'dashboard', label: 'Dashboard' },
      { to: 'patients', label: 'Patients' },
      { to: 'schedule', label: 'Schedule' },
    ],
    patient: [
      { to: 'dashboard', label: 'Dashboard' },
      { to: 'appointments', label: 'Appointments' },
    ],
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Panel</h2>
        <nav>
          {links[role].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="logout-area">
          <LogoutButton />
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
