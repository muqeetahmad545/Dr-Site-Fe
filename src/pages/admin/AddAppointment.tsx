// src/pages/admin/RegisterAppointments.tsx
import React, { useState } from "react";
import { Card, Form, Input, Select, message, Radio } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import type { Appointment } from "../../types/appointment";

const { Option } = Select;

// const dummyData: { [key: string]: Appointment } = {
//   "1": {
//     name: "John Doe",
//     email: "john@drsite.com",
//     phoneNumber: "+923031411121",
//     gender: "male",
//     address: "123 Main St",
//     note: "Well",
//     bloodGroup: "O+",
//     disease: "Normal",
//   },
//   "2": {
//     name: "John Doe",
//     email: "john@drsite.com",
//     phoneNumber: "+923031411121",
//     gender: "male",
//     address: "123 Main St",
//     note: "Well",
//     bloodGroup: "O+",
//     disease: "Normal",
//   },
// };

const AddAppointment: React.FC = () => {
  const doctorOptions = [
    { label: "Dr. John Smith", value: "john" },
    { label: "Dr. Jane Doe", value: "jane" },
    { label: "Dr. Ahmed Ali", value: "ahmed" },
  ];
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  // useEffect(() => {
  //   if (isEdit && dummyData[id!]) {
  //     form.setFieldsValue(dummyData[id!]);
  //   }
  // }, [id, form, isEdit]);

  const handleFinish = (values: Appointment) => {
    setLoading(true);
    console.log(isEdit ? "Updated Appointment:" : "Added Appointment:", values);
    message.success(
      `Appointment ${isEdit ? "updated" : "added"} successfully!`
    );
    setLoading(false);
    navigate("/admin/appointment");
  };

  return (
    <Card title={isEdit ? "Edit Appointment" : "Add Appointment"}>
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

        <Form.Item
          label="Consulting Doctor"
          name="consultingDoctor"
          rules={[{ required: true, message: "Please select a doctor!" }]}
        >
          <Select placeholder="Select a doctor">
            {doctorOptions.map((doc) => (
              <Option key={doc.value} value={doc.value}>
                {doc.label}
              </Option>
            ))}
          </Select>
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

        <Form.Item label="Blood Group" name="bloodGroup">
          <Input />
        </Form.Item>

        <Form.Item label="Disease" name="disease">
          <Input />
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <PrimaryButton onClick={() => navigate("/admin/all-appointments")}>
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

export default AddAppointment;
