import React, { useEffect, useState } from "react";
import { Card, Table, Statistic, Row, Col } from "antd";
import { Line } from "@ant-design/charts";
import { Pie } from "@ant-design/charts";
import {
  useGetAdminAppointmentsQuery,
  useGetDoctorsQuery,
  useGetPatientsQuery,
} from "../../features/api/admin/adminApi";
import type { Doctor } from "../../types/doctor";
import LoadingSpinner from "../../components/LoadingSpinner";
import type { Patient } from "../../types/patient";

const AdminDashboard: React.FC = () => {
  const { data: appointmentsData } = useGetAdminAppointmentsQuery();

  const appointments = appointmentsData?.data || [];
  const { data: doctorsData, isLoading } = useGetDoctorsQuery();
  const { data: patientData } = useGetPatientsQuery();
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const activeDoctorCount =
    doctorList.filter((doc) => doc.status === "active").length || 0;
  const doctorCount = doctorList.length || 0;
  const patientCount = patientList.length || 0;
  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(
    (appointment) => appointment.appointment_date === today
  );
  const todaysCount = todaysAppointments.length;

  useEffect(() => {
    if (patientData && patientData.data) {
      setPatientList(patientData.data);
    }
  }, [patientData]);
  useEffect(() => {
    if (doctorsData && doctorsData.data) {
      setDoctorList(doctorsData.data);
    }
  }, [doctorsData]);

  const appointmentsPerDayMap: Record<string, number> = {};

  appointments.forEach((appt: any) => {
    const day = new Date(appt.appointment_date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    appointmentsPerDayMap[day] = (appointmentsPerDayMap[day] || 0) + 1;
  });

  const lineData = Object.entries(appointmentsPerDayMap).map(
    ([day, count]) => ({
      day,
      appointments: count,
    })
  );

  const pieData = [
    { type: "Doctors", value: doctorCount },
    { type: "Patients", value: patientCount },
    { type: "Appointments", value: appointments.length },
  ];

  const columns = [
    { title: "Doctor", dataIndex: "name", key: "name" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Patients Today", dataIndex: "patients", key: "patients" },
  ];
  const doctorWithTodayPatients = doctorList.map((doc) => {
    const name = `${doc.first_name} ${doc.last_name}`;
    const patientsToday = appointments.filter(
      (a: any) =>
        a.appointment_date === today &&
        a.doctor?.user?.first_name === doc.first_name &&
        a.doctor?.user?.last_name === doc.last_name
    ).length;

    return {
      name,
      department: doc.doctor?.specialization || "N/A",
      patients: patientsToday,
    };
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  // if (isError) return <div>Error loading dashboard data</div>;
  return (
    <div className="admin-dashboard">
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Patient" value={patientCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Doctors" value={activeDoctorCount} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Appointments Today" value={todaysCount} />
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
              color={["#00bcd4"]}
              point={{ size: 5 }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="User Distribution" bordered={false}>
            <Pie
              className="pie-chart"
              data={pieData}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={{ visible: true, type: "outer" }}
              interactions={[{ type: "element-active" }]}
              height={300}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Today’s Top Performing Doctors"
        style={{ marginTop: 24 }}
        bordered={false}
      >
        <Table
          dataSource={doctorWithTodayPatients}
          columns={columns}
          pagination={false}
          size="middle"
          scroll={{ y: 150 }}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
