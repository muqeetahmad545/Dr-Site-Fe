import { useEffect, useState } from "react";
import { Table, Card, Modal, Descriptions } from "antd";
import { useGetAppointmentsDoctorQuery } from "../../features/api/doctor/doctorApi";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

const DrAppointments = () => {
  const navigate = useNavigate();
  const {
    data: appointmentsData,
    isLoading,
    refetch,
  } = useGetAppointmentsDoctorQuery();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    refetch();
  }, []);

  const patientList = appointmentsData?.data?.map((a: any) => {
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
      name: `${a.patient.user.first_name} ${a.patient.user.last_name}`,
      age,
      email: a.patient.user.email,
      symptoms: a.symptoms,
      phone: a.patient.user.phone,
      appointment_date: a.appointment_date,
      appointment_time: a.appointment_time,
      pharmacy: a.pharmacy,
    };
  });

  // const handleModalOpen = (patient: any) => {
  //   setSelectedPatient(patient);
  //   setOpenModal(true);
  // };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedPatient(null);
  };
  const handleViewDetails = (patient: any) => {
    navigate(`/doctor/appointments/${patient.id}`, {
      state: { patient },
    });
  };

  const columns = [
    { title: "Patient Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Symptoms", dataIndex: "symptoms", key: "symptoms" },
    { title: "Contact", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <PrimaryButton onClick={() => handleViewDetails(record)}>
          View Details
        </PrimaryButton>
      ),
    },
  ];

  return (
    <Card title="Appointments">
      <Table
        columns={columns}
        dataSource={patientList}
        rowKey="id"
        loading={isLoading}
      />

      <Modal open={openModal} onCancel={handleModalClose} footer={null}>
        {selectedPatient && (
          <Descriptions
            title="Appointment Information"
            style={{ textAlign: "center" }}
            bordered
            column={1}
            labelStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item label="Appointment Date">
              {selectedPatient.appointment_date}
            </Descriptions.Item>
            <Descriptions.Item label="Appointment Time">
              {selectedPatient.appointment_time}
            </Descriptions.Item>
            <Descriptions.Item label="Nerest Pharmacy">
              {selectedPatient.pharmacy}
            </Descriptions.Item>
            <Descriptions.Item label="Symptoms">
              {selectedPatient.symptoms}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Card>
  );
};

export default DrAppointments;
