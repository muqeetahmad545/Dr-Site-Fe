import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Card,
  message,
  Avatar,
  Upload,
  Row,
  Col,
  Select,
} from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { userProfile } from "../../hooks/userProfile";
import { useUpdateProfileMutation } from "../../features/api/auth/authApi";
import {
  decryptBase64,
  encryptBase64,
  SECRET_KEY,
  type EncryptedResult,
} from "../../helper/Crypto";

const AdminSetting: React.FC = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: profile, isLoading, isError, refetch } = userProfile();
  const [updateProfile] = useUpdateProfileMutation();
  const [profileImage, setProfileImage] = useState<EncryptedResult | null>(
    null
  );
  useEffect(() => {
    refetch();
  }, [refetch]);

  const decryptedProfileImage = (() => {
    const image = profileImage || profile?.data?.profile_image;
    if (typeof image === "object" && image?.data && image?.iv) {
      try {
        return decryptBase64(image.data, image.iv, SECRET_KEY);
      } catch (e) {
        return null;
      }
    }

    return null;
  })();
  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        first_name: profile.data.first_name || "",
        last_name: profile.data.last_name || "",
        email: profile.data.email || "",
        phone: profile.data.phone || "",
        address: profile.data.address || "",
        status: profile.data.status || "",
        gender: profile.data.gender || "",
        profile_image: profile.data.profile_image || "",
      });
    }
  }, [profile, form]);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Submitted values:", values);
      await updateProfile(values).unwrap();
      message.success("Profile updated successfully!");
      refetch();
    } catch (err: any) {
      const errorMessage =
        err?.data?.message?.message ||
        err?.data?.message ||
        err?.message ||
        "Profile update failed";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const readFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  const handleAvatarUpload = async ({ file, onSuccess }: any) => {
    if (!file.type.startsWith("image/")) {
      message.error("Only image files are allowed!");
      return;
    }

    try {
      const base64String = await readFileAsBase64(file);
      const encrypted = encryptBase64(base64String, SECRET_KEY);

      setProfileImage(encrypted);
      form.setFieldsValue({ profile_image: encrypted }); // <- now it will be included

      onSuccess?.("ok");
    } catch (error) {
      message.error("Failed to read image file");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div className="text-red-500">
        Error loading Profile. Please try again later.
      </div>
    );
  }
  return (
    <Card title="Profile">
      <div className="user-info">
        <Avatar
          size={100}
          src={
            decryptedProfileImage?.startsWith("data:image/")
              ? decryptedProfileImage
              : undefined
          }
          icon={<UserOutlined />}
          style={{ marginBottom: 8 }}
        />
        <Upload
          accept=".jpg,.jpeg,.png"
          showUploadList={false}
          beforeUpload={(file) => {
            const isJpgOrPng =
              file.type === "image/jpeg" || file.type === "image/png";

            if (!isJpgOrPng) {
              message.error("You can only upload JPG or PNG files!");
            }

            return isJpgOrPng;
          }}
          customRequest={handleAvatarUpload}
        >
          <PrimaryButton icon={<UploadOutlined />}>Upload Avatar</PrimaryButton>
        </Upload>

        <div className="user-name" style={{ color: "black" }}>
          {profile?.data.first_name || "John"}{" "}
          {profile?.data.last_name || "Doe"}
        </div>
        <div className="user-role" style={{ color: "black" }}>
          {profile?.data.role?.toUpperCase() || "ADMIN"}
        </div>
      </div>

      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item name="profile_image" hidden>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <Select placeholder="Select status">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <PrimaryButton
              onClick={() => navigate("/admin/dashboard")}
              htmlType="button"
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
