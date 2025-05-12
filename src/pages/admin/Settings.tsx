import React, { useEffect, useState } from "react";
import { Form, Input, Card, message, Avatar, Upload } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import type { User } from "../../types/user";
import { useNavigate } from "react-router-dom";

const AdminSetting: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
    const handleAvatarUpload = ({ file, onSuccess }: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string); 
      onSuccess?.("ok");
    };
    reader.readAsDataURL(file);
  };
  return (
    <Card title="Profile">
          <div className="user-info">
        <Avatar
          size={100}
          src={user?.image || imageUrl }
          icon={<UserOutlined />}
          style={{ marginBottom: 8 }}
        />
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              message.error("Only image files are allowed!");
            }
            return isImage;
          }}
          customRequest={handleAvatarUpload}
        >
          <PrimaryButton icon={<UploadOutlined />}>Upload Avatar</PrimaryButton>
        </Upload>

        <div className="user-name" style={{ color: "black" }}>
          {user?.name || "John"}
        </div>
        <div className="user-role" style={{ color: "black" }}>
          {user?.role?.toUpperCase() || "ADMIN"}
        </div>
      </div>


      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Phone number" name="phoneNumber">
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input />
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

export default AdminSetting;
