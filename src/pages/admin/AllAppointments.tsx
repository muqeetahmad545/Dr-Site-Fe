import React, { useState } from "react";
import { Table, Tag, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

const appointmentsData  = [
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
const [appointmentsList, setAppointmentList] = useState(appointmentsData);
const navigate= useNavigate()

    const handelDeleteAppointment = (id:any)=>{
    const updatedList = appointmentsList.filter((appointment)=>appointment.id !== id)
    setAppointmentList(updatedList);
  }

    const handelAddAppointment=()=>{
    navigate('/admin/add-appointment')
  }

  const handelEditAppointment = ( id :any)=>{
    navigate(`/admin/edit-appointment/${id}`)
  }
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
      render: (_: any, record: any) => (
        <>
          <EditOutlined onClick={()=>handelEditAppointment(record.id)} style={{ marginRight: 16, color: "#1890ff" }} />
          <DeleteOutlined onClick={()=>handelDeleteAppointment(record.id)}style={{ color: "#ff4d4f" }} />
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
          <PrimaryButton onClick={()=>handelAddAppointment()} >Add Appointment</PrimaryButton>
        </div>
      }
    >
      <Table dataSource={appointmentsList} columns={columns} rowKey="id" />
    </Card>
  );
};

export default AllAppointments;
