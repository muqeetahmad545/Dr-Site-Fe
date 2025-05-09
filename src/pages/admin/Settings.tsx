import React, { useEffect, useState } from "react";
import { Form, Input, Card, message, Avatar } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";
import { UserOutlined } from "@ant-design/icons";
import type { User } from "../../types/user";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      form.setFieldsValue({
        name: parsedUser.name || "John",
        email: parsedUser.email,
      });
    }
  }, [form]);

  const handleFinish = (values: any) => {
    setLoading(true);
    console.log("Settings Submitted:", values);
    message.success("Updated settings successfully!");
    setLoading(false);
  };

  return (
    <Card title="Profile">
      <div className="user-info">
        <Avatar
          size={64}
          src={user?.image || "/default-avatar.png"}
          icon={<UserOutlined />}
        />
        <div className="user-name" style={{ color: "black" }}>
          {user?.name || "John"}
        </div>
        <div className="user-role" style={{ color: "black" }}>
          {user?.role?.toUpperCase() || "ADMIN"}
        </div>
      </div>

      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <PrimaryButton
              onClick={() => navigate("/admin/dashboard")}
              htmlType="submit"
              loading={loading}
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton htmlType="submit" loading={loading}>
              Save Changes
            </PrimaryButton>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Settings;
