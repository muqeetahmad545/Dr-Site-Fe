import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Select, Spin, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
// import { PrimaryButton } from "../../components/PrimaryButton";
// import { useNavigate } from "react-router-dom";
import {
  useAssignMeetingLinkMutation,
  useGetAppointmentsQuery,
  useGetAvailableDoctorsByTimeMutation,
} from "../../features/api/admin/adminApi";
import type { Appointment } from "../../types/appointment";
import LoadingSpinner from "../../components/LoadingSpinner";
import { message } from "antd";
import { MdPersonAdd } from "react-icons/md";

const AllAppointments: React.FC = () => {
  // const navigate = useNavigate();
  const {
    data: appointmentsData,
    isLoading,
    refetch: refetchAppointments,
  } = useGetAppointmentsQuery();
  const [appointmentsList, setAppointmentList] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [assignMeetingLink] = useAssignMeetingLinkMutation();

  // ✅ State for doctor assignment
  const [assigningAppointment, setAssigningAppointment] = useState<any>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [getDoctors, { data: doctorData, isLoading: loadingDoctors }] =
    useGetAvailableDoctorsByTimeMutation();

  useEffect(() => {
    if (appointmentsData?.data) {
      const formatted = appointmentsData.data.map((a: any) => {
        const dob = new Date(a.patient.dob);
        const now = new Date();

        const ageInYears = now.getFullYear() - dob.getFullYear();
        const birthdayThisYear = new Date(
          now.getFullYear(),
          dob.getMonth(),
          dob.getDate()
        );

        const isUnderOneYear =
          (now < birthdayThisYear && ageInYears === 1) || ageInYears === 0;

        const age = isUnderOneYear
          ? `${Math.floor(
              (now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24)
            )} days`
          : `${ageInYears} years`;

        return {
          id: a.id,
          patientName: `${a.patient.user.first_name} ${a.patient.user.last_name}`,
          age,
          doctorName: a.doctor?.user
            ? `${a.doctor.user.first_name} ${a.doctor.user.last_name}`
            : "unassigned",
          date: `${a.appointment_date} ${a.appointment_time}`,
          appointment_date: a.appointment_date,
          appointment_time: a.appointment_time,
          symptoms: a.symptoms,
          active: a.status === "assigned",
        };
      });

      setAppointmentList(formatted as any);
    }
  }, [appointmentsData]);

  // const handelDeleteAppointment = (id: number) => {
  //   const updatedList = appointmentsList.filter((a) => a.id !== id);
  //   setAppointmentList(updatedList);
  // };

  // const handelAddAppointment = () => {
  //   navigate("/admin/add-appointment");
  // };

  // const handelEditAppointment = (id: number) => {
  //   navigate(`/admin/edit-appointment/${id}`);
  // };

  const openAssignModal = async (record: any) => {
    setAssigningAppointment(record);

    const date = new Date(record.appointment_date);
    const day = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    try {
      const response = await getDoctors({
        day,
        time: record.appointment_time,
      }).unwrap();

      if (response?.message) {
        message.success(response.message);
      }
    } catch (err: any) {
      message.error(err.data.message);
    }
  };
  const generateRoomID = (patientName: string) => {
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `${patientName.replace(/\s+/g, "_")}_${randomStr}`;
  };

  const handleCreateMeeting = async (appointment: any, doctorId: number) => {
    setLoading(true);
    try {
      const roomID = generateRoomID(appointment.patientName);
      const meetingLink = `${window.location.origin}/meeting?roomID=${roomID}`;
      const expiresAt = new Date(
        `${appointment.appointment_date} ${appointment.appointment_time}`
      );

      console.log("appointment_time", appointment.appointment_time);

      const response = await assignMeetingLink({
        appointmentId: appointment.id,
        doctorId,
        meetingLink,
        linkExpiresAt: expiresAt.toISOString(),
      }).unwrap();
      message.success(response.message);
    } catch (err: any) {
      message.error(err.data.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Patient Name", dataIndex: "patientName" },
    { title: "Age", dataIndex: "age" },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      render: (text: string) =>
        text === "unassigned" ? (
          <Tag color="red">Unassigned</Tag>
        ) : (
          <Tag color="green">{text}</Tag>
        ),
    },
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
        <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* <DeleteOutlined
            size={20}
            // onClick={() => handelDeleteAppointment(record.id)}
            style={{ color: "#ff4d4f", cursor: "pointer" }}
          /> */}

          {record.active ? (
            <CheckCircleOutlined
              style={{ color: "green", fontSize: 26 }}
              title="Doctor assigned"
            />
          ) : (
            <MdPersonAdd
              onClick={() => openAssignModal(record)}
              style={{ color: "green", cursor: "pointer" }}
              size={26}
              title="Assign doctor"
            />
          )}
        </span>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Card
          className="titel-button"
          title={
            <div className="header-row">
              <span>Appointments</span>
              {/* <PrimaryButton onClick={handelAddAppointment}>
                Add Appointment
              </PrimaryButton> */}
            </div>
          }
        >
          <Table dataSource={appointmentsList} columns={columns} rowKey="id" />
        </Card>
      )}

      {/* ✅ Modal to assign doctor */}
      <Modal
        open={!!assigningAppointment}
        onCancel={() => setAssigningAppointment(null)}
        onOk={async () => {
          if (assigningAppointment && selectedDoctorId) {
            setLoading(true);
            try {
              await handleCreateMeeting(assigningAppointment, selectedDoctorId);
              setAssigningAppointment(null);
              await refetchAppointments();
            } finally {
              setLoading(false);
            }
          }
        }}
        okButtonProps={{ disabled: !selectedDoctorId || loading, loading }}
        okText="Assign"
        title="Assign Doctor"
      >
        {loadingDoctors ? (
          <Spin />
        ) : (
          <Select
            style={{ width: "100%" }}
            placeholder="Select a doctor"
            onChange={(value) => setSelectedDoctorId(value)}
            value={selectedDoctorId}
          >
            {doctorData?.data?.map((doc: any) => (
              <Select.Option key={doc.doctor.id} value={doc.doctor.id}>
                {doc.doctor.user.first_name} {doc.doctor.user.last_name} — (
                {doc.doctor.specialization})
              </Select.Option>
            ))}
          </Select>
        )}
      </Modal>
    </>
  );
};

export default AllAppointments;
