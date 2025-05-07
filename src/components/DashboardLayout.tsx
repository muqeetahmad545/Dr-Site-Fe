import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../css/Layout.css";
import { LogoutButton } from "./LogoutButton";
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ProfileOutlined,
  UserOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { Header } from "./Header";
import HealthOverview from "../pages/patient/HealthOverview";

interface Props {
  role: "admin" | "doctor" | "patient";
}

const DashboardLayout: React.FC<Props> = ({ role }) => {
  const location = useLocation(); 

  const route = location.pathname.split("/").pop();
  const titles: { [key: string]: string } = {
    dashboard: "Dashboard",
    settings: "Settings",
    patients: "Patients",
    schedule: "Schedule",
    appointments: "Appointments",
    userManagement: "User Management",
    healthOverview: "Health Overview",
  };

  const title = titles[route || "dashboard"];

  const links = {
    admin: [
      { to: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      { to: "userManagement", label: "User Management", icon: <UserOutlined /> },
      { to: "settings", label: "Settings", icon: <SettingOutlined /> },
    ],
    doctor: [
      { to: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      { to: "patients", label: "Patients", icon: <TeamOutlined /> },
      { to: "schedule", label: "Schedule", icon: <CalendarOutlined /> },
    ],
    patient: [
      { to: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      { to: "healthOverview", label: "HealthOverview",icon: <MedicineBoxOutlined  />  },
      { to: "appointments", label: "Appointments", icon: <ProfileOutlined /> },
    ],
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="panel-title">
          {role.charAt(0).toUpperCase() + role.slice(1)} Panel
        </h2>
        <nav className="nav-menu">
          {links[role].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="logout-container">
          <LogoutButton />
        </div>
      </aside>
      <main className="content">
        <Header title={title} />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
