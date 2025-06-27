import { Form, Input, Card, message, Col, Row, Select } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import type { Admin } from "../../types/admin";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Make sure styles are imported
import { useCreateAdminMutation } from "../../features/api/superAdmin/superAdminApi";

const AddAdmin = () => {
  const { Option } = Select;
  const [addAdmin, { isLoading }] = useCreateAdminMutation();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values: Admin) => {
    try {
      setLoading(true);
      const response = await addAdmin(values).unwrap();
      if (response.status === "success") {
        message.success(response.message || "Admin created successfully");
        navigate("/SuperAdmin/admins");
      } else {
        message.error(response.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Add admin error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Failed to add admin. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={isEdit ? "Edit Admin" : "Add Admin"}>
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Phone number is required" }]}
            >
              <PhoneInput
                country="pk"
                inputStyle={{ width: "100%" }}
                value={form.getFieldValue("phone")}
                onChange={(value) => form.setFieldsValue({ phone: value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
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

        <Form.Item style={{ textAlign: "right" }}>
          <PrimaryButton
            onClick={() => navigate("/SuperAdmin/admins")}
            style={{ marginRight: 8 }}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton htmlType="submit" loading={loading || isLoading}>
            {isEdit ? "Update" : "Submit"}
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddAdmin;
