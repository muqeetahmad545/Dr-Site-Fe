import { Card, Col, Row, Statistic, List } from 'antd';
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

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Patients" value={stats.patients} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Today's Appointments" value={stats.todayAppointments} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Reports" value={stats.pendingReports} />
          </Card>
        </Col>
      </Row>

      <Card title="Upcoming Appointments">
        <List
          dataSource={upcomingAppointments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.name} - ${item.time}`}
                description={`Reason: ${item.reason}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DoctorDashboard;
