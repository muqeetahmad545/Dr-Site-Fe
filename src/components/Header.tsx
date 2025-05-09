import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { LogoutButton } from "./LogoutButton";
import type { User } from "../types/user";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Dr Site" }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const profileCard = user && (
    <div className="profile-card">
      <div className="profile-info">
        <p>
          <strong>Welcome,</strong> {user.name || "Jhon"}
        </p>
        <LogoutButton />
      </div>
    </div>
  );

  return (
    <header className="app-header">
      <h1 className="header-title">{title}</h1>
      {user && (
        <Dropdown
          dropdownRender={() => profileCard}
          placement="bottomRight"
          trigger={["click"]}
          overlayClassName="custom-dropdown"
        >
          <div className="profile-icon">
            <div>{user.name || "Jhon"}</div>
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Dropdown>
      )}
    </header>
  );
};
