import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Modal, Select, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useGetDoctorsQuery,
  useUpdateDoctorByIdMutation,
} from "../../features/api/admin/adminApi";
import type { Doctor } from "../../types/doctor";
import LoadingSpinner from "../../components/LoadingSpinner";

const { Option } = Select;

const AllDoctors: React.FC = () => {
  const navigate = useNavigate();

  const { data: doctorsData, refetch, isLoading } = useGetDoctorsQuery();
  const [updateDoctorStatus] = useUpdateDoctorByIdMutation();

  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (doctorsData && doctorsData.data) {
      setDoctorList(doctorsData.data);
    }
  }, [doctorsData]);

  const showStatusModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStatus(doctor.status ?? "");
    setIsModalVisible(true);
  };

  const handleStatusChange = async () => {
    if (!selectedDoctor) return;

    try {
      await updateDoctorStatus({ id: selectedDoctor.id, status }).unwrap();
      message.success("Doctor status updated!");
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      message.error("Failed to update doctor status.");
    }
  };

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
      render: (_: any, record: Doctor) => (
        <Tag
          color={record.status === "active" ? "green" : "red"}
          style={{ cursor: "pointer" }}
          onClick={() => showStatusModal(record)}
        >
          {record.status === "active" ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_: any, record: Doctor) => (
        <EyeOutlined
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/doctor/${record.id}`);
          }}
          style={{ color: "#1890ff", fontSize: 18, cursor: "pointer" }}
        />
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Card
        className="titel-button"
        title={
          <div className="header-row">
            <span>Doctors</span>
          </div>
        }
      >
        <Table
          dataSource={doctorList}
          columns={columns}
          rowKey="id"
          loading={isLoading}
        />
      </Card>

      <Modal
        title="Update Doctor Status"
        open={isModalVisible}
        onOk={handleStatusChange}
        onCancel={() => setIsModalVisible(false)}
        okText="Update"
      >
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          style={{ width: "100%" }}
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Modal>
    </>
  );
};

export default AllDoctors;
