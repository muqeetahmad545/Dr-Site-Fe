// src/pages/patient/Appointments.tsx

import  { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  notification,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import DrSmithImg from "../../assets/driamge.jpg";
import "../../css/Appointments.css";
import { PrimaryButton } from "../../components/PrimaryButton";

const { Title, Paragraph } = Typography;

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Smith", date: "2025-05-10", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Johnson", date: "2025-05-15", time: "02:30 PM" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedDate = values.date.format("YYYY-MM-DD");
        const formattedTime = values.time.format("hh:mm A");

        setAppointments([
          ...appointments,
          {
            id: appointments.length + 1,
            doctor: values.doctor,
            date: formattedDate,
            time: formattedTime,
          },
        ]);

        notification.success({
          message: "Appointment Scheduled",
          description: `You have scheduled an appointment with ${values.doctor} on ${formattedDate} at ${formattedTime}.`,
        });

        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const handleCancelAppointment = (id: number) => {
  //   setAppointments(
  //     appointments.filter((appointment) => appointment.id !== id)
  //   );
  //   notification.success({
  //     message: "Appointment Cancelled",
  //     description: `You have cancelled your appointment with id: ${id}.`,
  //   });
  // };
  const doctors = [
    {
      id: 1,
      name: "Dr. Smith",
      experience: "16 Years Experience Overall",
      image: DrSmithImg,
      description: "Work and Student Sickness Certificate",
      price: "€45.99",
    },
    {
      id: 2,
      name: "Dr. Johnson",
      experience: "16 Years Experience Overall",
      image: DrSmithImg,
      description: "Work and Student Sickness Certificate",
      price: "€45.99",
    },
    {
      id: 3,
      name: "Dr. Lee",
      experience: "16 Years Experience Overall",
      image: DrSmithImg,
      description: "Work and Student Sickness Certificate",
      price: "€45.99",
    },
  ];

  return (
    <div>
      <Title className="titel" level={3}>
        Doctor Letters & Sick Notes
      </Title>
      <Paragraph className="titel">
        Same-day letters, sick notes, medical certificates and referral letters.
      </Paragraph>
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <Title className="titel" level={4}>
          Terms & Conditions – Certificates Consultation
        </Title>
        <Paragraph>
          <strong>Doctor’s Discretion:</strong> All certificates are issued at
          the discretion of the doctor after a consultation with the patient.
          The doctor will assess the request and determine whether it is
          appropriate and safe to issue the certificate. If the doctor deems it
          suitable, the certificate will be provided. However, if the doctor
          decides not to issue a certificate, the patient will be informed
          accordingly.
        </Paragraph>
        <Paragraph>
          <strong>No Refund Policy:</strong> If a certificate is not issued
          following the consultation, no refund will be processed. The service
          provided is the consultation itself, and refunds do not apply as the
          appointment slot was reserved for the patient’s request.
        </Paragraph>
        <Paragraph>
          <strong>Pre-Consultation Confirmation:</strong> It is the patient’s
          responsibility to confirm with our support team before booking a
          consultation if they have any doubts about whether the requested
          certificate can be issued. Once a consultation is booked, refunds will
          not be processed based on the outcome.
        </Paragraph>
        <Paragraph>
          <strong>Independent Medical Judgment:</strong> Our doctors work
          independently while adhering to the platform’s policies, ensuring that
          patient safety remains the top priority. Decisions regarding
          certification are made solely based on professional medical judgment.
        </Paragraph>
        <Paragraph>
          <strong>Requirement for Face-to-Face Consultation:</strong> In certain
          cases, where our doctors determine that a face-to-face consultation is
          necessary for patient safety, appropriate instructions will be
          provided to the patient.
        </Paragraph>
        <Paragraph>
          By booking a consultation, you acknowledge and agree to these terms
          and conditions.
        </Paragraph>
      </div>
      <Row gutter={[16, 16]}>
        {doctors.map((doctor) => (
          <Col xs={24} sm={12} md={8} key={doctor.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={doctor.name}
                  src={doctor.image}
                  className="doctor-image"
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              }
              actions={[
                <PrimaryButton
                  htmlType="submit"
                  onClick={showModal}
                  style={{ width: "150px" }}
                >
                  Book Appointment
                </PrimaryButton>,
              ]}
            >
              <Card.Meta
                style={{ textAlign: "center" }}
                title={doctor.description}
                description={doctor.price}
              />
              <Paragraph style={{ textAlign: "center", marginTop: 8 }}>
                {doctor.experience}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <div style={{ marginBottom: 24 }}>
        <Title level={4}>Your Appointments</Title>
        <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
          Schedule Appointment
        </Button>
        <Table columns={columns} dataSource={appointments} rowKey="id" />
      </div> */}

      <Modal
        className="titel"
        title="Schedule Appointment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="appointmentForm">
          <Form.Item
            name="doctor"
            label="Doctor"
            rules={[
              { required: true, message: "Please input the doctor's name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please select the appointment date!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="time"
            label="Time"
            rules={[
              {
                required: true,
                message: "Please select the appointment time!",
              },
            ]}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Appointments;
