import React, { useEffect, useState } from "react";
import { Table, Tag, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useGetAppointmentsQuery } from "../../features/api/admin/adminAPi";
import type { Appointment } from "../../types/appointment";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllAppointments: React.FC = () => {
  const navigate = useNavigate();
  const { data: appointmentsData, isLoading } = useGetAppointmentsQuery();
  const [appointmentsList, setAppointmentList] = useState<Appointment[]>([]);

  useEffect(() => {
    if (appointmentsData && appointmentsData.data) {
      const formattedData = appointmentsData.data.map((appointment: any) => {
        const dob = new Date(appointment.patient.dob);
        const age = new Date().getFullYear() - dob.getFullYear();

        return {
          id: appointment.id,
          patientName: `${appointment.patient.user.first_name} ${appointment.patient.user.last_name}`,
          age: age,
          doctorName: "N/A",
          date: `${appointment.appointment_date} ${appointment.appointment_time}`,
          symptoms: appointment.symptoms,
          active: appointment.status === "assigned",
        };
      });

      setAppointmentList(formattedData);
    }
  }, [appointmentsData]);
  const handelDeleteAppointment = (id: any) => {
    const updatedList = appointmentsList.filter(
      (appointment) => appointment.id !== id
    );
    setAppointmentList(updatedList);
  };

  const handelAddAppointment = () => {
    navigate("/admin/add-appointment");
  };

  const handelEditAppointment = (id: any) => {
    navigate(`/admin/edit-appointment/${id}`);
  };
  const columns = [
    { title: "Patient Name", dataIndex: "patientName" },
    { title: "Age", dataIndex: "age" },
    { title: "Doctor Name", dataIndex: "doctorName" },
    { title: "Date", dataIndex: "date" },
    { title: "Symptoms", dataIndex: "symptoms" },
    {
      title: "Status",
      dataIndex: "active",
      render: (active: boolean) =>
        active ? (
          <Tag color="green">assigned</Tag>
        ) : (
          <Tag color="red">unassigned</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <>
          <EditOutlined
            onClick={() => handelEditAppointment(record.id)}
            style={{ marginRight: 16, color: "#1890ff" }}
          />
          <DeleteOutlined
            onClick={() => handelDeleteAppointment(record.id)}
            style={{ color: "#ff4d4f" }}
          />
        </>
      ),
    },
  ];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  //   if (isError) {
  // return (
  //   <div className="text-red-600 font-semibold bg-red-100 p-4 rounded">
  //     Error loading Appointments. Please try again later.
  //   </div>
  // );
  //   }
  return (
    <Card
      className="titel-button"
      title={
        <div className="header-row">
          <span>Appointments</span>
          <PrimaryButton onClick={() => handelAddAppointment()}>
            Add Appointment
          </PrimaryButton>
        </div>
      }
    >
      <Table
        loading={isLoading}
        dataSource={appointmentsList}
        columns={columns}
        rowKey="id"
      />
    </Card>
  );
};

export default AllAppointments;
