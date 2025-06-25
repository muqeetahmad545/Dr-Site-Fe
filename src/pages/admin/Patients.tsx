import React, { useEffect, useState } from "react";
import { Table, Tag, Card, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useGetPatientsQuery } from "../../features/api/admin/adminApi";
import type { Patient } from "../../types/patient";
import LoadingSpinner from "../../components/LoadingSpinner";
import { userProfile } from "../../hooks/userProfile";

const AllPatients: React.FC = () => {
  const { data: profile, isLoading, isError, refetch } = userProfile();
  const navigate = useNavigate();
  const { data: patientData } = useGetPatientsQuery();
  const [patientList, setPatientList] = useState<Patient[]>([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isProfileComplete = (profile: any) => {
    return (
      profile?.data.first_name &&
      profile?.data.email &&
      profile?.data.status === "active"
    );
  };

  useEffect(() => {
    if (patientData && patientData.data) {
      setPatientList(patientData.data);
    }
  }, [patientData]);

  const handleAddPatient = () => {
    if (!isProfileComplete(profile)) {
      message.warning(
        "To proceed, please complete your profile information in settings."
      );
      navigate("/admin/settings");
      return;
    }
    navigate("/admin/add-patient");
  };

  const handleEditPatient = (id: string) => {
    if (!isProfileComplete(profile)) {
      message.warning(
        "To proceed, please complete your profile information in settings."
      );
      navigate("/admin/settings");
      return;
    }
    navigate(`/admin/edit-patient/${id}`);
  };

  const handleDelete = (id: string) => {
    if (!isProfileComplete(profile)) {
      message.warning(
        "To proceed, please complete your profile information in settings."
      );
      navigate("/admin/settings");
      return;
    }
    const updatedList = patientList.filter((patient) => patient.id !== id);
    setPatientList(updatedList);
    message.success("Patient deleted successfully!");
  };

  const columns = [
    {
      title: "Name",
      render: (_: any, record: Patient) =>
        `${record.first_name} ${record.last_name}`,
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Address", dataIndex: "address" },
    { title: "Age", dataIndex: "age" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string | undefined) =>
        status === "active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_: any, record: Patient) => (
        <>
          <EditOutlined
            onClick={() => handleEditPatient(record.id)}
            style={{ marginRight: 16, color: "#1890ff", cursor: "pointer" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record.id)}
            style={{ color: "#ff4d4f", cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div className="text-red-500">
        Error loading patients. Please try again later.
      </div>
    );
  }
  return (
    <Card
      className="titel-button"
      title={
        <div className="header-row">
          <span>Patients</span>
          <PrimaryButton onClick={handleAddPatient}>Add Patient</PrimaryButton>
        </div>
      }
    >
      <Table
        dataSource={patientList}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default AllPatients;
