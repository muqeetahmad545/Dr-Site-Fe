import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Checkbox } from "antd";
import type { ProfileSetupProps } from "../../types/profile";

const AccountDetails: React.FC<ProfileSetupProps> = ({ formData, setFormData }) => {
  const [form] = Form.useForm();
  const [showInsuranceFields, setShowInsuranceFields] = useState<boolean>(
    !!formData.insuranceCheckbox
  );

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleValuesChange = (_: any, allValues: any) => {
    setFormData((prev: any) => ({
      ...prev,
      ...allValues,
    }));
    setShowInsuranceFields(allValues.insuranceCheckbox);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={formData}
    >
      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input type="email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Passport Number" name="passport" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Reference Address"
            name="referenceAddress"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="insuranceCheckbox" valuePropName="checked">
        <Checkbox>
          Do you have insurance?
        </Checkbox>
      </Form.Item>

      {showInsuranceFields && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Insurance Company Name"
              name="insuranceCompany"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Insurance Number"
              name="insuranceNumber"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default AccountDetails;
