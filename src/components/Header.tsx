import "../css/Header.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { LogoutButton } from "./LogoutButton";
import { userProfile } from "../hooks/userProfile";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Dr Site" }) => {
  const navigate = useNavigate();

  const { data: profile, isLoading, isError, refetch } = userProfile();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handelOpenProfie = () => {
    navigate("settings");
  };

  const profileCard = profile ? (
    <div className="profile-card">
      <div className="profile-info">
        <div>
          <Avatar
            size={40}
            src={profile.data.profile_image || "/default-avatar.png"}
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
            onClick={handelOpenProfie}
          />
        </div>
        <p className="mb-3">
          <strong>Welcome,</strong> {profile.data.first_name || "John"}
        </p>
        <LogoutButton />
      </div>
    </div>
  ) : null;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <header className="app-header">
        <p>Error loading profile!</p>
      </header>
    );
  }

  return (
    <header className="app-header">
      <h1 className="header-title">{title}</h1>
      {profile && (
        <Dropdown
          dropdownRender={() => profileCard}
          placement="bottomRight"
          trigger={["click"]}
          overlayClassName="custom-dropdown"
        >
          <div className="profile-icon">
            <div>{profile.data.first_name || "John"}</div>
            <Avatar
              size={40}
              src={profile.data.profile_image || "/default-avatar.png"}
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Dropdown>
      )}
    </header>
  );
};
