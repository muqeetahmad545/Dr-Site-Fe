import { Row, Col, Card, Descriptions, Statistic, Empty } from 'antd';
import { UserOutlined, CalendarOutlined, HeartOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, ResponsiveContainer as PieResponsiveContainer } from 'recharts';


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
  appointmentsTrend: [
    { date: '2025-05-01', count: 2 },
    { date: '2025-05-02', count: 3 },
    { date: '2025-05-03', count: 1 },
    { date: '2025-05-04', count: 4 },
    { date: '2025-05-05', count: 3 },
  ],
  medicalConditionDistribution: [
    { name: 'Hypertension', value: 60 },
    { name: 'Asthma', value: 40 },
  ],
};

export const PatientDashboard = () => {
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        {/* Patient Info Card */}
        <Col xs={24} md={8}>
          <Card
            title="Patient Information"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
            extra={<UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
          >
            <Descriptions bordered>
              <Descriptions.Item label="Name">{patientData.name}</Descriptions.Item>
              <Descriptions.Item label="Age">{patientData.age}</Descriptions.Item>
              <Descriptions.Item label="Gender">{patientData.gender}</Descriptions.Item>
              <Descriptions.Item label="Contact">{patientData.contact}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Upcoming Appointments Card */}
        <Col xs={24} md={8}>
          <Card
            title="Upcoming Appointments"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
            extra={<CalendarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />}
          >
            {patientData.upcomingAppointments.length > 0 ? (
              patientData.upcomingAppointments.map((appointment, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <Statistic
                    title={`Appointment with ${appointment.doctor}`}
                    value={`${appointment.date} at ${appointment.time}`}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </div>
              ))
            ) : (
              <Empty description="No upcoming appointments" />
            )}
          </Card>
        </Col>

        {/* Medical History Card */}
        <Col xs={24} md={8}>
          <Card
            title="Medical History"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
            extra={<HeartOutlined style={{ fontSize: '24px', color: '#4d96c1' }} />}
          >
            {patientData.medicalHistory.length > 0 ? (
              patientData.medicalHistory.map((history, index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <Statistic
                    title={history.condition}
                    value={`Last checked: ${history.lastChecked}`}
                    valueStyle={{ color: '#4d96c1' }}
                  />
                </div>
              ))
            ) : (
              <Empty description="No medical history available" />
            )}
          </Card>
        </Col>
      </Row>

      {/* Chart Section */}
      <Row gutter={[24, 24]} style={{ marginTop: '10px' }}>
        {/* Appointment Trend Chart */}
        <Col xs={24} md={12}>
          <Card
            title="Appointment Trend (Last 5 Days)"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientData.appointmentsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#1890ff" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Medical Condition Distribution Pie Chart */}
        <Col xs={24} md={12}>
          <Card
            title="Medical Condition Distribution"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <PieResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientData.medicalConditionDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#59aa56"
                  label
                >
                  {patientData.medicalConditionDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={['#59aa56', '#4d96c1'][index]} />
                  ))}
                </Pie>
              </PieChart>
            </PieResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
