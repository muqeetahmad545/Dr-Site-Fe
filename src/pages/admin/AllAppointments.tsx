import React from "react";
import { Table, Tag, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";

const users = [
  {
    id: 1,
    pattientName: "John Doe",
    age: "10",
    disease: "Liver Disease",
    date: "5 Dec 2019	",
    doctorName: "john",
    active: true,
  },
  {
    id: 2,
    pattientName: "Jane Smith",
    age: "10",
    disease: "Infectious",
    date: "5 Dec 2019	",
    doctorName: "jane",
    active: false,
  },
];

const AllAppointments: React.FC = () => {
  const columns = [
    { title: "Pattient Name", dataIndex: "pattientName" },
    { title: "Age", dataIndex: "age" },
    { title: "Doctor Name", dataIndex: "doctorName" },
    { title: "Date", dataIndex: "date" },
    { title: "Disease", dataIndex: "disease" },
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
          <span>Appointments</span>
          <PrimaryButton>Add Appointment</PrimaryButton>
        </div>
      }
    >
      <Table dataSource={users} columns={columns} rowKey="id" />
    </Card>
  );
};

export default AllAppointments;
