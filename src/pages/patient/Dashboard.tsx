import { Row, Col, Card, Descriptions, Statistic, Empty } from 'antd';

const patientData = {
  name: 'John Doe',
  age: 30,
  gender: 'Male',
  contact: '+1 234 567 890',
  medicalHistory: [
    { condition: 'Hypertension', lastChecked: '2025-02-15' },
    { condition: 'Asthma', lastChecked: '2024-10-20' },
  ],
  upcomingAppointments: [
    { doctor: 'Dr. Smith', date: '2025-05-10', time: '10:00 AM' },
    { doctor: 'Dr. Johnson', date: '2025-05-15', time: '02:30 PM' },
  ],
};

export const PatientDashboard = () => {
  return (
    <div>
      <Row gutter={16}>
        {/* Patient Info Card */}
        <Col span={8}>
          <Card title="Patient Information">
            <Descriptions bordered>
              <Descriptions.Item label="Name">{patientData.name}</Descriptions.Item>
              <Descriptions.Item label="Age">{patientData.age}</Descriptions.Item>
              <Descriptions.Item label="Gender">{patientData.gender}</Descriptions.Item>
              <Descriptions.Item label="Contact">{patientData.contact}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Upcoming Appointments Card */}
        <Col span={8}>
          <Card title="Upcoming Appointments">
            {patientData.upcomingAppointments.length > 0 ? (
              patientData.upcomingAppointments.map((appointment, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <Statistic
                    title={`Appointment with ${appointment.doctor}`}
                    value={`${appointment.date} at ${appointment.time}`}
                  />
                </div>
              ))
            ) : (
              <Empty description="No upcoming appointments" />
            )}
          </Card>
        </Col>

        {/* Medical History Card */}
        <Col span={8}>
          <Card title="Medical History">
            {patientData.medicalHistory.length > 0 ? (
              patientData.medicalHistory.map((history, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <Statistic
                    title={history.condition}
                    value={`Last checked: ${history.lastChecked}`}
                  />
                </div>
              ))
            ) : (
              <Empty description="No medical history available" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
