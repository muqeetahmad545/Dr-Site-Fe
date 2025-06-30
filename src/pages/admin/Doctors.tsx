import React, { useEffect, useState } from "react";
import { Table, Tag, Card } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "../../features/api/admin/adminApi";
import type { Doctor } from "../../types/doctor";
import LoadingSpinner from "../../components/LoadingSpinner";
// import { userProfile } from "../../hooks/userProfile";

const AllDoctors: React.FC = () => {
  const navigate = useNavigate();
  // const { data: profile, refetch } = userProfile();
  const { data: doctorsData, refetch, isLoading } = useGetDoctorsQuery();
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  useEffect(() => {
    refetch();
  }, [refetch]);
  // const isProfileComplete = (profile: any) => {
  //   return (
  //     profile?.data.first_name &&
  //     profile?.data.email &&
  //     profile?.data.status === "active"
  //   );
  // };

  useEffect(() => {
    if (doctorsData && doctorsData.data) {
      setDoctorList(doctorsData.data);
    }
  }, [doctorsData]);

  // const handleDelete = (id: any) => {
  //   if (!isProfileComplete(profile)) {
  //     message.warning(
  //       "To proceed, please complete your profile information in settings."
  //     );
  //     navigate("/admin/settings");
  //     return;
  //   }
  //   const updatedList = doctorList.filter((doc) => doc.id !== id);
  //   setDoctorList(updatedList);
  //   message.success("Doctor deleted successfully!");
  // };

  // const handleAddDoctor = () => {
  //   if (!isProfileComplete(profile)) {
  //     message.warning(
  //       "To proceed, please complete your profile information in settings."
  //     );
  //     navigate("/admin/settings");
  //     return;
  //   }
  //   navigate("/admin/add-doctor");
  // };

  // const handelEditPatient = (id: any) => {
  //   if (!isProfileComplete(profile)) {
  //     message.warning(
  //       "To proceed, please complete your profile information in settings."
  //     );
  //     navigate("/admin/settings");
  //     return;
  //   }
  //   navigate(`/admin/edit-doctor/${id}`);
  // };

  const columns = [
    {
      title: "Name",
      render: (_: any, record: Doctor) =>
        record.first_name || record.last_name
          ? `${record.first_name ?? ""} ${record.last_name ?? ""}`.trim()
          : "N/A",
    },
    { title: "Email", dataIndex: "email" },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text: any) => (text ? text : "N/A"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text: any) => (text ? text : "N/A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (active: boolean) =>
        active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    // {
    //   title: "Actions",
    //   render: (_: any, record: any) => (
    //     <>
    //       <EditOutlined
    //         onClick={() => handelEditPatient(record.id)}
    //         style={{ marginRight: 16, color: "#1890ff", cursor: "pointer" }}
    //       />
    //       <DeleteOutlined
    //         onClick={() => handleDelete(record.id)}
    //         style={{ color: "#ff4d4f", cursor: "pointer" }}
    //       />
    //     </>
    //   ),
    // },
  ];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Card
      className="titel-button"
      title={
        <div className="header-row">
          <span>Doctors</span>
          {/* <PrimaryButton onClick={handleAddDoctor}>Add Doctor</PrimaryButton> */}
        </div>
      }
    >
      <Table
        dataSource={doctorList}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => navigate(`/admin/doctor/${record.id}`),
        })}
      />
    </Card>
  );
};

export default AllDoctors;
