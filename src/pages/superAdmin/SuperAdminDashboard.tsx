import { Card, Col, Row } from "antd";
import { Column } from "@ant-design/charts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SuperAdminDashboard = () => {
  const doctorPatientStats = [
    { type: "Doctors", value: 50 },
    { type: "Patients", value: 200 },
  ];

  const pieData = [
    { name: "Cardiologists", value: 10 },
    { name: "Neurologists", value: 15 },
    { name: "Pediatricians", value: 8 },
    { name: "General", value: 17 },
  ];

  const COLORS = ["#1890ff", "#13c2c2", "#52c41a", "#fa8c16"];

  return (
    <div className="">
      <Card title="Super Admin Dashboard">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Doctors & Patients Overview">
              <Column
                data={doctorPatientStats}
                xField="type"
                yField="value"
                label={{ position: "middle" }}
                height={300}
                color={["#1890ff", "#fa541c"]}
              />
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Doctor Specialties">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
