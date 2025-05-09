import { Card, Col, Row, Statistic, List, Avatar, Typography } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis as BarXAxis, YAxis as BarYAxis, Tooltip as BarTooltip } from 'recharts';

const { Text } = Typography;

const DoctorDashboard = () => {
  const stats = {
    patients: 124,
    todayAppointments: 5,
    pendingReports: 3,
  };

  const upcomingAppointments = [
    { name: 'John Doe', time: '10:00 AM', reason: 'Check-up' },
    { name: 'Jane Smith', time: '11:30 AM', reason: 'Follow-up' },
    { name: 'Alice Brown', time: '1:00 PM', reason: 'Consultation' },
  ];

  const lineData = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 35 },
    { name: 'Wed', value: 40 },
    { name: 'Thu', value: 50 },
    { name: 'Fri', value: 70 },
    { name: 'Sat', value: 60 },
    { name: 'Sun', value: 90 },
  ];

  const barData = [
    { day: 'Mon', appointments: 5 },
    { day: 'Tue', appointments: 8 },
    { day: 'Wed', appointments: 10 },
    { day: 'Thu', appointments: 12 },
    { day: 'Fri', appointments: 7 },
  ];

  // const pieData = [
  //   { name: 'Check-up', value: 70 },
  //   { name: 'Follow-up', value: 20 },
  //   { name: 'Consultation', value: 10 },
  // ];

  return (
    <div style={{backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Patients"
              value={stats.patients}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Today's Appointments"
              value={stats.todayAppointments}
              prefix={<CalendarOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Pending Reports"
              value={stats.pendingReports}
              prefix={<FileTextOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Appointments per Day */}
      <Card title="Appointments per Day" style={{ marginTop: '10px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <defs>
              <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgb(90, 172, 78)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(74, 144, 226, 0.9)', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <BarXAxis dataKey="day" />
            <BarYAxis />
            <BarTooltip />
            <Bar dataKey="appointments" fill="url(#gradientPrimary)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      {/* Row for Pending Report Distribution & Upcoming Appointments side by side */}
      <Row gutter={[24, 24]} style={{ marginTop: '10px' }}>
        <Col xs={24} md={12}>
        <Card title="Appointment Trend (Last 7 Days)">
        <ResponsiveContainer width="100%" height={285}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#1890ff" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
          {/* <Card
            title="Pending Report Distribution"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#faad14"
                  label
                >
                  {pieData.map((entry, index) => (
                    <PieCell
                      key={`cell-${index}`}
                      fill={['#1890ff', '#52c41a', '#faad14'][index]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card> */}
        </Col>

        <Col xs={24} md={12}>
          <Card
            title="Upcoming Appointments"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={upcomingAppointments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: '#87d068' }}>
                        {item.name.split(' ').map((n) => n[0]).join('')}
                      </Avatar>
                    }
                    title={<Text strong>{item.name}</Text>}
                    description={
                      <>
                        <Text type="secondary">Time: {item.time}</Text>
                        <br />
                        <Text>Reason: {item.reason}</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorDashboard;
