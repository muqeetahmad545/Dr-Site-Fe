import React from "react";
import { Table, Tag, Card, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

const doctor = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    phone: '+923031411121',
    email: "john@drsite.com",
    active: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    phone: '+923031411122',
    email: "jane@drsite.com",
    active: false,
  },
];

const AllDoctors: React.FC = () => {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = React.useState(doctor);
  const handleDelete = (id: any) => {
    const updatedList = doctorList.filter((doc) => doc.id !== id);
    setDoctorList(updatedList);
    message.success("Doctor deleted successfully!");
  };
  
    const handelAddPatient=()=>{
    navigate('/admin/add-doctor')
  }

  const handelEditPatient = ( id :any)=>{
    navigate(`/admin/edit-doctor/${id}`)
  }
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Phone", dataIndex: "phone" },
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
          <EditOutlined
            onClick={() => handelEditPatient(record.id)}
            style={{ marginRight: 16, color: "#1890ff", cursor: "pointer" }}
          />
          <DeleteOutlined onClick={() => handleDelete(record.id)} style={{ color: "#ff4d4f", cursor: "pointer" }} />
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
          <PrimaryButton onClick={() => handelAddPatient()}>
            Add Doctor
          </PrimaryButton>
        </div>
      }
    >
      <Table dataSource={doctorList} columns={columns} rowKey="id" />
    </Card>
  );
};

export default AllDoctors;
