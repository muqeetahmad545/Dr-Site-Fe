import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Avatar, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import type { ProfileSetupProps } from "../../types/profile";


const PersonalInfo: React.FC<ProfileSetupProps> = ({ formData, setFormData }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(formData.avatar || null);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleAvatarUpload = ({ file, onSuccess }: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageUrl(base64);
      setFormData((prev: any) => ({ ...prev, avatar: base64 }));
      onSuccess?.("ok");
    };
    reader.readAsDataURL(file);
  };

  const handleValuesChange = (_: any, allValues: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...allValues,
    }));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={formData}
    >
      <div className="user-info">
        <Avatar
          size={100}
          src={imageUrl || undefined}
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
          <PrimaryButton icon={<UploadOutlined />}>Click to Upload</PrimaryButton>
        </Upload>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Gender" name="gender">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Role" name="role">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PersonalInfo;
