// src/pages/admin/Settings.tsx
import React from 'react';
import { Form, Input, Button, Switch, Card } from 'antd';

const Settings: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Settings saved:', values);
  };

  return (
    <Card className='' title="System Settings" style={{ maxWidth: 600 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Site Title" name="siteTitle" initialValue="Dr Site">
          <Input />
        </Form.Item>
        <Form.Item label="Admin Email" name="adminEmail" initialValue="admin@drsite.com">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Enable Notifications" name="notifications" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Settings;
