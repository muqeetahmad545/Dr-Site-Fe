// src/pages/admin/RegisterPatient.tsx
import React, {  useState } from "react";
import { Card, Form, Input, message, Radio } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import type { Patient } from "../../types/patient";
// const dummyData: { [key: string]: Patient } = {
//   "1": {
//     first_name: "John Doe",
//     email: "john@drsite.com",
//     phone: "+923031411121",
//     gender: "male",
//     address: "123 Main St",
//     condition: "Well",
//     bloodGroup: "O+",
//   },
//   "2": {
//     first_name: "John Doe",
//     email: "john@drsite.com",
//     phone: "+923031411121",
//     gender: "male",
//     address: "123 Main St",
//     condition: "Well",
//     bloodGroup: "O+",
//   },
// };

const AddPatient: React.FC = () => {
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

  const handleFinish = (values: Patient) => {
    setLoading(true);
    console.log(isEdit ? "Updated Patient:" : "Added Patient:", values);
    message.success(`Patient ${isEdit ? "updated" : "added"} successfully!`);
    setLoading(false);
    navigate("/admin/Patient");
  };

  return (
    <Card title={isEdit ? "Edit Patient" : "Add Patient"}>
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
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
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

        <Form.Item label="Condition" name="condition">
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <PrimaryButton onClick={() => navigate("/admin/patients")}>
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

export default AddPatient;
