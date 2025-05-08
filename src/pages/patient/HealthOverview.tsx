// Example: Patient Health Overview Page (Professional UI)
import React from 'react';
import { Card, Col, Row, Statistic, Progress } from 'antd';

const HealthOverview = () => {
  const healthData = {
    bmi: 24.5,
    bloodPressure: '120/80 mmHg',
    cholesterol: '190 mg/dL',
    activityLevel: 70, // percentage of daily activity goal achieved
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="BMI">
            <Statistic title="Body Mass Index" value={healthData.bmi} />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Blood Pressure">
            <Statistic title="Blood Pressure" value={healthData.bloodPressure} />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Cholesterol">
            <Statistic title="Cholesterol Level" value={healthData.cholesterol} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Activity Level">
            <Progress type="circle" percent={healthData.activityLevel} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HealthOverview;
