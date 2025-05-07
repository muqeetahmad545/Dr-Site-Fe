import React from 'react';
import { Card, Table, Statistic, Row, Col } from 'antd';
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';

const dataSource = [
  { key: '1', name: 'Dr. John Doe', department: 'Cardiology', patients: 12 },
  { key: '2', name: 'Dr. Smith Lee', department: 'Neurology', patients: 8 },
];

const columns = [
  { title: 'Doctor', dataIndex: 'name', key: 'name' },
  { title: 'Department', dataIndex: 'department', key: 'department' },
  { title: 'Patients Today', dataIndex: 'patients', key: 'patients' },
];

const AdminDashboard: React.FC = () => {
  const lineData = [
    { day: 'Monday', appointments: 20 },
    { day: 'Tuesday', appointments: 30 },
    { day: 'Wednesday', appointments: 25 },
    { day: 'Thursday', appointments: 35 },
    { day: 'Friday', appointments: 40 },
  ];

  const pieData = [
    { type: 'Doctors', value: 56 },
    { type: 'Patients', value: 1234 },
    { type: 'Admin', value: 10 },
  ];

  return (
    <div className="admin-dashboard">
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Users" value={1234} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Doctors" value={56} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Appointments Today" value={78} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Appointments This Week" bordered={false}>
            <Line
              data={lineData}
              xField="day"
              yField="appointments"
              seriesField="day"
              smooth
              height={300} 
              color={['#00bcd4']}
              point={{ size: 5 }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="User Distribution" bordered={false}>
            <Pie
            className='pie-chart'
              data={pieData}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={{ visible: true, type: 'outer' }}
              interactions={[{ type: 'element-active' }]}
              height={300}  
            />
          </Card>
        </Col>
      </Row>

      <Card title="Today’s Top Performing Doctors" style={{ marginTop: 24 }} bordered={false}>
        <Table dataSource={dataSource} columns={columns} pagination={false} size="middle" />
      </Card>
    </div>
  );
};

export default AdminDashboard;