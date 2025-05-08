// src/pages/doctor/Patients.tsx

import { Table, Button, Typography, Card } from 'antd';

const { Title } = Typography;

const patientList = [
  { id: 1, name: 'John Doe', age: 35, condition: 'Hypertension', contact: '123-456-7890' },
  { id: 2, name: 'Alice Johnson', age: 29, condition: 'Asthma', contact: '987-654-3210' },
  { id: 3, name: 'Michael Scott', age: 50, condition: 'Diabetes', contact: '555-333-1111' },
];

const columns = [
  { title: 'Patient Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Condition', dataIndex: 'condition', key: 'condition' },
  { title: 'Contact', dataIndex: 'contact', key: 'contact' },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <>
        <Button type="link">View History</Button>
        <Button type="link">Prescribe</Button>
      </>
    ),
  },
];

const Patients = () => {
  return (
    <Card title="Patients">
     <Table columns={columns} dataSource={patientList} rowKey="id" />
    </Card>
  );
};

export default Patients;
