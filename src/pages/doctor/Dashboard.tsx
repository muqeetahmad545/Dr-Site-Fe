import { Card, Col, Row, Statistic, List, Avatar, Typography } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis as BarXAxis,
  YAxis as BarYAxis,
  Tooltip as BarTooltip,
} from "recharts";
import { useGetAppointmentsDoctorQuery } from "../../features/api/doctor/doctorApi";
import { format, subDays } from "date-fns";

const { Text } = Typography;

const DoctorDashboard = () => {
  const { data: appointmentsData } = useGetAppointmentsDoctorQuery();

  const appointments = appointmentsData?.data || [];
  const totalAppointments = appointments.length;
  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(
    (appointment) => appointment.appointment_date === today
  );

  const stats = {
    patients: totalAppointments,
    todayAppointments: todaysAppointments.length,
    pendingReports: 3,
  };
  const upcomingAppointments = appointments
    .filter((appointment) => appointment?.status === "assigned")
    .map((item) => ({
      name: item.patient?.user?.first_name,
      time: item.appointment_time,
      reason: item.symptoms || "General",
      date: item.appointment_date || "",
    }));

  // Generate lineData from appointments
  const getLineData = (appointments: any[]) => {
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const day = subDays(today, i);
      const dayLabel = format(day, "EEE"); // e.g., "Mon", "Tue"
      const dateString = format(day, "yyyy-MM-dd");

      const count = appointments.filter(
        (a) => a.appointment_date === dateString
      ).length;

      data.push({ name: dayLabel, value: count });
    }

    return data;
  };

  const lineData = getLineData(appointments);

  const getBarData = (appointments: any[]) => {
    const barMap: Record<string, number> = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    appointments.forEach((a) => {
      const day = format(new Date(a.appointment_date), "EEE");
      if (barMap[day] !== undefined) {
        barMap[day]++;
      }
    });

    return Object.entries(barMap).map(([day, appointments]) => ({
      day,
      appointments,
    }));
  };

  const barData = getBarData(appointments);

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Appointments"
              value={stats.patients}
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Today's Appointments"
              value={stats.todayAppointments}
              prefix={<CalendarOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Pending Reports"
              value={stats.pendingReports}
              prefix={<FileTextOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Bar Chart for Appointments per Day */}
      <Card title="Appointments per Day" style={{ marginTop: "10px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <defs>
              <linearGradient
                id="gradientPrimary"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "rgb(90, 172, 78)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{
                    stopColor: "rgba(74, 144, 226, 0.9)",
                    stopOpacity: 1,
                  }}
                />
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
      <Row gutter={[24, 24]} style={{ marginTop: "10px" }}>
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
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              minHeight: "390px",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={upcomingAppointments.slice(0, 3)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: "#87d068" }}>
                        {item.name
                          ?.split(" ")
                          .map((part: any) => part.charAt(0).toUpperCase())
                          .join("") || "?"}
                      </Avatar>
                    }
                    title={<Text strong>{item.name}</Text>}
                    description={
                      <>
                        <Text type="secondary">Time: {item.time}</Text>
                        <br />
                        <Text type="secondary">Date: {item.date}</Text>
                        <br />
                        {/* <Text>Reason: {item.reason}</Text> */}
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
