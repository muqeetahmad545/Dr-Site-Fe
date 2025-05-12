import React, { useState } from "react";
import { Table, Tag, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

const patient = [
  {
    id: 1,
    name: "John Doe",
    age: "15",
    address: "lhr",
    disease: "Liver Disease	",
    email: "john@drsite.com",
    active: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: "10",
    address: "lhr",
    disease: "Infectious",
    email: "jane@drsite.com",
    active: false,
  },
];

const AllPatients: React.FC = () => {
  const [patientList,setPatientList]= useState(patient)
  const navigate= useNavigate()
  
  const handelAddPatient=()=>{
    navigate('/admin/add-patient')
  }

  const handelEditPatient = ( id :any)=>{
    navigate(`/admin/edit-patient/${id}`)
  }

  const handleDelete = (id:any)=>{
    const updatedList = patientList.filter((patient)=>patient.id !== id)
    setPatientList(updatedList);
  }
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    { title: "Age", dataIndex: "age" },
    { title: "Email", dataIndex: "email" },
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
          <EditOutlined onClick = {()=>handelEditPatient (record.id)}style={{ marginRight: 16, color: "#1890ff" }} />
          <DeleteOutlined  onClick={()=>handleDelete (record.id)}style={{ color: "#ff4d4f" }} />
        </>
      ),
    },
  ];

  return (
    <Card
      className="titel-button"
      title={
        <div className="header-row">
          <span>Patients</span>
          <PrimaryButton onClick={()=>handelAddPatient()}>Add Patient</PrimaryButton>
        </div>

      }
    >
      <Table dataSource={patientList} columns={columns} rowKey="id" />
    </Card>
  );
};

export default AllPatients;
