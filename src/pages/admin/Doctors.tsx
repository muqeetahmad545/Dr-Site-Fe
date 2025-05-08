import React from "react";
import { Table, Tag, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";

const users = [
  {
    id: 1,
    name: "John Doe",
    role: "Doctor",
    email: "john@drsite.com",
    active: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Doctor",
    email: "jane@drsite.com",
    active: false,
  },
];

const AllDoctors: React.FC = () => {
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Status",
      dataIndex: "active",
      render: (active: boolean) =>
        active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      render: () => (
        <>
          <EditOutlined style={{ marginRight: 16, color: "#1890ff" }} />
          <DeleteOutlined style={{ color: "#ff4d4f" }} />
        </>
      ),
    },
  ];

  return (
    <Card
      className="titel-button"
      title={
        <div className="header-row">
          <span>Doctors</span>
          <PrimaryButton>Add Doctor</PrimaryButton>
        </div>
      }
    >
      <Table dataSource={users} columns={columns} rowKey="id" />
    </Card>
  );
};

export default AllDoctors;
