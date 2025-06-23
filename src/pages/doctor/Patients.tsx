import { useState } from "react";
import { Table, Button, Card, Modal, Descriptions, message } from "antd";
import { PrimaryButton } from "../../components/PrimaryButton";

const patientList = [
  {
    id: 1,
    name: "John Doe",
    age: 35,
    condition: "Hypertension",
    contact: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Alice Johnson",
    age: 29,
    condition: "Asthma",
    contact: "987-654-3210",
    email: "alice.johnson@example.com",
  },
  {
    id: 3,
    name: "Michael Scott",
    age: 50,
    condition: "Diabetes",
    contact: "555-333-1111",
    email: "michael.scott@example.com",
  },
];

// Generate unique roomID for meeting link
const generateRoomID = (patientName: string) => {
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${patientName.replace(/\s+/g, "_")}_${randomStr}`;
};

// Dummy API function simulating sending email
async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  console.log("Sending email:", { to, subject, body });
  return new Promise((resolve) =>
    setTimeout(() => resolve("Email sent"), 1000)
  );
}

const Patients = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleModalOpen = (patient: any) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedPatient(null);
  };

  const handleCreateMeeting = async (patient: any) => {
    setLoading(true);
    try {
      const roomID = generateRoomID(patient.name);
      const meetingLink = `${window.location.origin}/meeting?roomID=${roomID}`;

      // Dummy sender and receiver emails:
      const senderEmail = "muqeetahmad545@gmail.com";
      const patientEmail = patient.email;

      // Email subject and body
      const subject = "New Meeting Link Created";
      const body = `Hello,\n\nA new meeting has been created.\n\nMeeting Link: ${meetingLink}\n\nThanks!`;

      // Simulate sending email to patient
      await sendEmail({ to: patientEmail, subject, body });

      // Simulate sending email to self (sender)
      await sendEmail({ to: senderEmail, subject, body });

      message.success(
        `Meeting link created and emails sent to ${patientEmail} and ${senderEmail}`
      );
    } catch (error) {
      message.error("Failed to create meeting or send emails.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Patient Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Condition", dataIndex: "condition", key: "condition" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => handleModalOpen(record)}>
            View History
          </Button>
          <PrimaryButton
            loading={loading}
            onClick={() => handleCreateMeeting(record)}
          >
            Create Meeting
          </PrimaryButton>
        </>
      ),
    },
  ];

  return (
    <Card title="Patients">
      <Table columns={columns} dataSource={patientList} rowKey="id" />

      <Modal open={openModal} onCancel={handleModalClose} footer={null}>
        {selectedPatient && (
          <Descriptions
            title="Patient Information"
            style={{ textAlign: "center" }}
            bordered
            column={1}
            labelStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item label="Name">
              {selectedPatient.name}
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {selectedPatient.age}
            </Descriptions.Item>
            <Descriptions.Item label="Condition">
              {selectedPatient.condition}
            </Descriptions.Item>
            <Descriptions.Item label="Contact">
              {selectedPatient.contact}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Card>
  );
};

export default Patients;
