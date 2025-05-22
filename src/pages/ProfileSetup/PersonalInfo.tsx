import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Avatar, Upload, message, Select } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import type { ProfileSetupProps } from "../../types/profile";
import FileUploader from "../../components/FileUploader";

const PersonalInfo: React.FC<ProfileSetupProps> = ({
  form,
  formData,
  setFormData,
}) => {
  const { Option } = Select;

  // const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState<string | null>(
    formData.profile_image || null
  );

  const [address_document, setAddress_document] = useState<string | null>(
    formData.address_document || null
  );
  console.log("address_document", address_document);
  useEffect(() => {
    form.setFieldsValue(formData);
    setProfileImage(formData.profile_image || null);
  }, [formData, form]);

  // const handleAvatarUpload = ({ file, onSuccess }: any) => {
  //   const isImage = file.type.startsWith("image/");
  //   if (!isImage) {
  //     message.error("Only image files are allowed!");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const base64 = reader.result as string;
  //     setImageUrl(base64);
  //     setFormData((prev: any) => ({ ...prev, avatar: base64 }));
  //     onSuccess?.("ok");
  //   };
  //   reader.readAsDataURL(file);
  // };
  // const handleAvatarUpload = async ({ file, onSuccess }: any) => {
  //   const isImage = file.type.startsWith("image/");
  //   if (!isImage) {
  //     message.error("Only image files are allowed!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await uploadFile(formData).unwrap();
  //     const imageUrl = response.url; // Assuming response contains the URL
  //     setImageUrl(imageUrl);
  //     setFormData((prev: any) => ({ ...prev, avatar: imageUrl }));
  //     onSuccess?.("ok");
  //   } catch (error) {
  //     message.error("File upload failed!");
  //     console.error(error);
  //   }
  // };

  const handleAvatarUpload = async ({ file, onSuccess }: any) => {
    const isImage = file.type.startsWith("image/");
    console.log("Uploaded file type:", file.type); // Log file type
    if (!isImage) {
      message.error("Only image files are allowed!");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;

      console.log("Base64 image string:", base64String); // Log base64 image string

      setProfileImage(base64String);
      form.setFieldsValue({ profile_image: base64String });
      setFormData((prev: any) => ({
        ...prev,
        profile_image: base64String,
      }));

      onSuccess?.("ok");
    };
    console.log("Payload before sending:", formData);

    reader.onerror = () => {
      console.error("Error reading the file"); // Log error
      message.error("Failed to read image file");
    };

    reader.readAsDataURL(file);
  };

  // const handleAddresDocomentFileUpload =
  //   (name: string) =>
  //   ({ file, onSuccess }: any) => {
  //     const isFile =
  //       file.type.startsWith("application/") || file.type.startsWith("image/");

  //     // const isFile = file.type.startsWith("application/"); // Adjust as needed (for documents)
  //     if (!isFile) {
  //       message.error("Only document files are allowed!");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64 = reader.result as string;
  //       setAddress_document(base64);
  //       setFormData((prev: any) => ({
  //         ...prev,
  //         address_document: base64, // Save Base64 string in formData
  //       }));
  //       onSuccess?.("ok");
  //     };
  //     reader.readAsDataURL(file);
  //   };

  const handleValuesChange = (_: any, allValues: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...allValues,
    }));
  };

  const handleAddresDocomentFileUpload = async ({ file, onSuccess }: any) => {
    if (!file) {
      message.error("No file selected");
      return;
    }

    const isValidFile =
      file.type.startsWith("application/") || file.type.startsWith("image/");

    if (!isValidFile) {
      message.error("Only document or image files are allowed!");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      setAddress_document(base64String);
      setFormData((prev: any) => ({
        ...prev,
        address_document: base64String,
      }));

      console.log("address_document", address_document);

      onSuccess?.("ok");
    };

    reader.onerror = () => {
      message.error("Failed to read file");
    };

    reader.readAsDataURL(file);
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
          src={profileImage || undefined}
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
          <PrimaryButton icon={<UploadOutlined />}>
            Upload Profile Image
          </PrimaryButton>
        </Upload>
      </div>

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
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input autoComplete="email" />
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
          <Form.Item
            label="Gender"
            name="gender"
            initialValue="male"
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Status"
            name="status"
            initialValue="active"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inActive">InActive</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Passport Number" name="passport_number">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          {/* <Form.Item
            label="Address Document"
            // rules={[{ required: true, message: "Upload address document" }]}
          >
            <FileUploader
              name="file"
              multiple={false}
              customRequest={handleAddresDocomentFileUpload}
              maxCount={1}
            />
          </Form.Item> */}
          <Form.Item label="Address Document">
            {address_document ? (
              <img
                src={address_document}
                alt="Address Document"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  marginBottom: 8,
                }}
              />
            ) : (
              <p>No document uploaded</p>
            )}
            <FileUploader
              name="file"
              multiple={false}
              customRequest={handleAddresDocomentFileUpload}
              maxCount={1}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PersonalInfo;
