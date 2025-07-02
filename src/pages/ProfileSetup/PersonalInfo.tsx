import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Avatar, Upload, message, Select } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import type { ProfileSetupProps } from "../../types/profile";
import FileUploader from "../../components/FileUploader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  decryptBase64,
  encryptBase64,
  SECRET_KEY,
  type EncryptedResult,
} from "../../helper/Crypto";

const PersonalInfo: React.FC<ProfileSetupProps> = ({
  form,
  formData,
  setFormData,
}) => {
  const { Option } = Select;

  const [addressDocument, setAddressDocument] =
    useState<EncryptedResult | null>(formData.address_document || null);

  const [profileImage, setProfileImage] = useState<EncryptedResult | null>(
    formData.profile_image || null
  );

  useEffect(() => {
    form.setFieldsValue(formData);
    if (formData.profile_image) {
      setProfileImage(formData.profile_image);
    }
    if (formData.address_document) {
      setAddressDocument(formData.address_document);
    }
  }, [formData, form]);

  const onValuesChange = (allValues: any) => {
    setFormData((prev: any) => ({ ...prev, ...allValues }));
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
      console.log("base64String", base64String);
      const encrypted = encryptBase64(base64String, SECRET_KEY);
      setProfileImage(encrypted);
      form.setFieldsValue({ profile_image: encrypted });
      console.log("encrypted", encrypted);
      console.log("profile_image", form.setFieldsValue.profile_image);
      setFormData((prev: any) => ({ ...prev, profile_image: encrypted }));

      onSuccess?.("ok");
    } catch (error) {
      message.error("Failed to read image file");
    }
  };

  const handleAddressDocumentUpload = async ({ file, onSuccess }: any) => {
    if (!file) {
      message.error("No file selected");
      return;
    }

    if (
      !(file.type.startsWith("application/") || file.type.startsWith("image/"))
    ) {
      message.error("Only document or image files are allowed!");
      return;
    }

    try {
      const base64String = await readFileAsBase64(file);
      const encrypted = encryptBase64(base64String, SECRET_KEY);

      setAddressDocument(encrypted);
      form.setFieldsValue({ address_document: encrypted });
      setFormData((prev: any) => ({
        ...prev,
        address_document: encrypted,
      }));

      onSuccess?.("ok");
    } catch (error) {
      message.error("Failed to process file");
    }
  };

  const decryptDocument = (encrypted: EncryptedResult) =>
    decryptBase64(encrypted.data, encrypted.iv, SECRET_KEY);

  const decryptedProfileImage = profileImage
    ? decryptBase64(profileImage.data, profileImage.iv, SECRET_KEY)
    : null;

  return (
    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
      <div className="user-info" style={{ marginBottom: 24 }}>
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
        {/* <Form.Item
          name="profileImage"
          rules={[{ required: true, message: "Please upload a profile image" }]}
          style={{ marginBottom: 0 }}
        >
          <input type="hidden" />
        </Form.Item> */}
        <Upload
          accept=".jpg,.jpeg,.png"
          showUploadList={false}
          beforeUpload={(file) => {
            const isJpgOrPng =
              file.type === "image/jpeg" || file.type === "image/png";

            if (!isJpgOrPng) {
              message.error("Only JPG or PNG files are allowed!");
            }

            return isJpgOrPng;
          }}
          customRequest={handleAvatarUpload}
        >
          <PrimaryButton icon={<UploadOutlined />}>
            Upload Profile Image
          </PrimaryButton>
        </Upload>
      </div>
      {/* Personal info fields */}
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
            <Input autoComplete="email" readOnly />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true }]}
          >
            <PhoneInput
              disableDropdown
              country="ie"
              // Use form.getFieldValue to set value to keep in sync
              value={form.getFieldValue("phone")}
              onChange={(phone) => {
                form.setFieldsValue({ phone });
                setFormData((prev: any) => ({ ...prev, phone }));
              }}
              inputStyle={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
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
          {/* <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inActive">InActive</Option>
            </Select>
          </Form.Item> */}
          <Form.Item label="Status" name="status" initialValue="status">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Passport Number / ID" name="passport_number">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Address Document">
            {addressDocument ? (
              (() => {
                const decryptedData =
                  addressDocument && decryptDocument(addressDocument);
                if (!decryptedData) return <p>No document uploaded</p>;

                if (decryptedData.startsWith("data:application/pdf")) {
                  return (
                    <PrimaryButton
                      style={{ margin: 10 }}
                      onClick={() => {
                        const win = window.open();
                        if (win) {
                          win.document.write(
                            `<iframe src="${decryptedData}" frameborder="0" style="width:100%;height:100vh;" allowfullscreen></iframe>`
                          );
                        }
                      }}
                    >
                      View PDF Document
                    </PrimaryButton>
                  );
                } else {
                  return (
                    <img
                      src={decryptedData}
                      alt="Address Document"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 150,
                        marginBottom: 8,
                        padding: 10,
                        border: "1px solid #ccc",
                      }}
                    />
                  );
                }
              })()
            ) : (
              <p>No document uploaded</p>
            )}

            <FileUploader
              name="file"
              multiple={false}
              customRequest={handleAddressDocumentUpload}
              maxCount={1}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PersonalInfo;
