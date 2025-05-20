import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { ProfileSetupProps } from "../../types/profile";

const EducationDetails: React.FC<ProfileSetupProps> = ({ formData, setFormData }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(formData.proof_of_education || null);

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleFileUpload = ({ file, onSuccess }: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageUrl(base64);
      setFormData((prev: any) => ({
        ...prev,
        proof_of_education: base64,
      }));
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
      <Form.Item
        label="IMC Number"
        name="imc"
        rules={[{ required: true, message: "IMC Number is required" }]}
      >
        <Input />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Department"
            name="dept"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Educator"
            name="educator"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Education Institute"
            name="education_institute"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Proof of Education" name="proof_of_education">
            <Upload
              name="proof_of_education_file"
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("Only image files are allowed!");
                }
                return isImage;
              }}
              customRequest={handleFileUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Proof</Button>
            </Upload>

            {/* Optional: Show uploaded preview if available */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Proof"
                style={{ marginTop: 10, width: 100, height: "auto", borderRadius: 4 }}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EducationDetails;
