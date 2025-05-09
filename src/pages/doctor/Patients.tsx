import {
  Table,
  Button,
  Card,
  Modal,
  Descriptions,
} from "antd";
import { useState } from "react";


const patientList = [
  {
    id: 1,
    name: "John Doe",
    age: 35,
    condition: "Hypertension",
    contact: "123-456-7890",
  },
  {
    id: 2,
    name: "Alice Johnson",
    age: 29,
    condition: "Asthma",
    contact: "987-654-3210",
  },
  {
    id: 3,
    name: "Michael Scott",
    age: 50,
    condition: "Diabetes",
    contact: "555-333-1111",
  },
];

const Patients = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handleModalOpen = (patient: any) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedPatient(null);
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
          <Button type="link">Prescribe</Button>
        </>
      ),
    },
  ];

  return (
    <Card title="Patients">
      <Table columns={columns} dataSource={patientList} rowKey="id" />

      <Modal open={openModal} onCancel={handleModalClose} footer={null}>
        {selectedPatient && (
          <>
            <Descriptions
              title="Patient Information"
              style={{textAlign:'center'}}
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
          </>
        )}
      </Modal>
    </Card>
  );
};

export default Patients;
