import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../css/Layout.css";
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ProfileOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { Header } from "./Header";
import { LogoutButton } from "./LogoutButton";
import logo from "../assets/logo.png";
import { userProfile } from "../hooks/userProfile";
import { decryptBase64, SECRET_KEY } from "../helper/Crypto";

interface Props {
  role: "admin" | "doctor" | "patient" | "SuperAdmin";
}

interface NavLinkItem {
  to?: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavLinkItem[];
}

export const SideBarLayout: React.FC<Props> = ({ role }) => {
  const { data: profile } = userProfile();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [label: string]: boolean }>({});

  const route = location.pathname.split("/").pop();
  const titles: { [key: string]: string } = {
    dashboard: "Dashboard",
    settings: "Settings",
    patient: "Patients",
    schedule: "Schedule",
    appointments: "Appointments",
    doctors: "Doctors",
    addDoctor: "Add Doctor",
    Appointments: "Appointments",
    addPatient: "Add Patient",
    "health-overview": "Health Overview",
    "all-appointments": "Appointments",
    admin: "Admin",
    "add-admin": "Add Admin",
    "edit-admin": "Edit Admin",
  };

  const title = titles[route || "dashboard"];

  const links: Record<
    "admin" | "doctor" | "patient" | "SuperAdmin",
    NavLinkItem[]
  > = {
    SuperAdmin: [
      // { to: "add-admin", label: "Dashboard", icon: <DashboardOutlined /> },
      {
        to: "dashboard",
        label: "Dashboard",
        icon: <TeamOutlined />,
      },
      { to: "admin", label: "Admin", icon: <TeamOutlined /> },
    ],
    admin: [
      { to: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      {
        label: "Doctors",
        icon: <UserOutlined />,
        children: [
          { to: "doctors", label: "Doctor" },
          // { to: "add-doctor", label: "Add Doctor" },
        ],
      },
      // {
      //   label: "Patients",
      //   icon: <TeamOutlined />,
      //   children: [
      //     { to: "patients", label: "Patient List" },
      //     // { to: "add-patient", label: "Add Patient" },
      //   ],
      // },
      {
        to: "all-appointments",
        label: "Appointments",
        icon: <ProfileOutlined />,
      },
      { to: "settings", label: "Settings", icon: <SettingOutlined /> },
    ],
    doctor: [
      { to: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      { to: "appointments", label: "Appointments", icon: <TeamOutlined /> },
      { to: "schedule", label: "Schedule", icon: <CalendarOutlined /> },
      { to: "settings", label: "Settings", icon: <SettingOutlined /> },
    ],
    patient: [
      { to: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
      {
        to: "health-overview",
        label: "Health Overview",
        icon: <MedicineBoxOutlined />,
      },
      { to: "appointments", label: "Appointments", icon: <ProfileOutlined /> },
      { to: "settings", label: "Settings", icon: <SettingOutlined /> },
    ],
  };

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const profileImage = profile?.data?.profile_image as
    | { data: string; iv: string }
    | undefined;

  const decryptedProfileImage = profileImage
    ? decryptBase64(profileImage.data, profileImage.iv, SECRET_KEY)
    : null;

  if (!links[role]) return <div>Unauthorized role</div>;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="app-logo" />
          <strong>Cliniva</strong>
        </div>

        <h2 className="panel-title">{capitalize(role)} Panel</h2>

        {profile && (
          <div className="user-info">
            <div className="avatar-container">
              <Avatar
                size={64}
                src={decryptedProfileImage || undefined}
                icon={!decryptedProfileImage && <UserOutlined />}
              />
            </div>
            <div className="user-name">{profile.data.first_name || "John"}</div>
            <div className="user-role">{role.toUpperCase()}</div>
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
                            ? "nav-link sub-link active"
                            : "nav-link sub-link"
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
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <span className="icon">{link.icon}</span>
                <span className="label">{link.label}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="sidebar-bottom">
          <div className="logout-container">
            <LogoutButton />
            <strong style={{ marginTop: "10px", display: "block" }}>
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

export default SideBarLayout;
