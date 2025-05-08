// src/pages/admin/Settings.tsx
import React from "react";
import { Form, Input, Card } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";

const Settings: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Settings saved:", values);
  };

  return (
      <Card className="" title="System Settings">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Site Title" name="siteTitle" initialValue="Dr Site">
            <Input />
          </Form.Item>
          <Form.Item
            label="Admin Email"
            name="adminEmail"
            initialValue="admin@drsite.com"
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item>
            <PrimaryButton  htmlType="submit" style={{ width: "150px" }}>
              Save Changes
            </PrimaryButton>
          </Form.Item>
        </Form>
      </Card>
  );
};

export default Settings;
