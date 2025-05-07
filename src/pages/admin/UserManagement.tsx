import React from 'react';
import { Table, Tag, Button, Card } from 'antd';

const users = [
  { id: 1, name: 'John Doe', role: 'Doctor', email: 'john@drsite.com', active: true },
  { id: 2, name: 'Jane Smith', role: 'Patient', email: 'jane@drsite.com', active: false },
];

const UserManagement: React.FC = () => {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role' },
    {
      title: 'Status',
      dataIndex: 'active',
      render: (active: boolean) =>
        active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: 'Actions',
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  return (
    <Card title="User Management">
      <Table dataSource={users} columns={columns} rowKey="id" />
    </Card>
  );
};

export default UserManagement;
