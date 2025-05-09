// src/pages/admin/RegisterDoctor.tsx
import React, { useEffect, useState } from "react";
import { Card, Form, Input, message, Radio } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import type { Doctor } from "../../types/doctor";
const dummyData: { [key: string]: Doctor } = {
  "1": {
    name: "John Doe",
    email: "john@drsite.com",
    phoneNumber: "+923031411121",
    gender: "male",
    specialization: "Cardiology",
    address: "123 Main St",
    pastExperience: "10 years at City Hospital",
  },
  "2": {
    name: "John Doe",
    email: "john@drsite.com",
    phoneNumber: "+923031411121",
    gender: "male",
    specialization: "Cardiology",
    address: "123 Main St",
    pastExperience: "10 years at City Hospital",
  },
};

const AddDoctor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && dummyData[id!]) {
      form.setFieldsValue(dummyData[id!]);
    }
  }, [id, form, isEdit]);

  const handleFinish = (values: Doctor) => {
    setLoading(true);
    console.log(isEdit ? "Updated Doctor:" : "Added Doctor:", values);
    message.success(`Doctor ${isEdit ? "updated" : "added"} successfully!`);
    setLoading(false);
    navigate("/admin/doctors");
  };

  return (
    <Card title={isEdit ? "Edit Doctor" : "Add Doctor"}>
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Specialization" name="specialization">
          <Input />
        </Form.Item>

        <Form.Item label="Past Experience" name="pastExperience">
          <Input />
        </Form.Item>

        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <PrimaryButton onClick={() => navigate("/admin/doctors")}>
              Cancel
            </PrimaryButton>
            <PrimaryButton htmlType="submit" loading={loading}>
              {isEdit ? "Update" : "Submit"}
            </PrimaryButton>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddDoctor;
