import "../css/Header.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { LogoutButton } from "./LogoutButton";
import { userProfile } from "../hooks/userProfile";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { decryptBase64, SECRET_KEY } from "../helper/Crypto";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "Dr Site" }) => {
  const navigate = useNavigate();

  const { data: profile, isLoading, isError, refetch } = userProfile();

  const profileImage = profile?.data?.profile_image as
    | { data: string; iv: string }
    | undefined;

  const decryptedProfileImage = profileImage
    ? decryptBase64(profileImage.data, profileImage.iv, SECRET_KEY)
    : null;

  useEffect(() => {
    refetch();
  }, [refetch]);
  const handelOpenProfie = () => {
    navigate(`settings`);
  };

  const profileCard = (
    <div className="profile-card">
      <div className="profile-info">
        <div>
          <Avatar
            src={decryptedProfileImage}
            onClick={() => handelOpenProfie()}
            size={40}
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
        </div>
        <p className="mb-3">
          <strong>Welcome,</strong> {profile?.data.first_name || "John"}
        </p>
        <LogoutButton />
      </div>
    </div>
  );

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
              src={decryptedProfileImage || undefined}
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Dropdown>
      )}
    </header>
  );
};
