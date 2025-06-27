import { Calendar, Badge, Card } from "antd";
import { useGetAppointmentsDoctorQuery } from "../../features/api/doctor/doctorApi";
import LoadingSpinner from "../../components/LoadingSpinner";

const Schedule = () => {
  const { data: appointmentsData, isLoading } = useGetAppointmentsDoctorQuery();

  // Step 1: Map appointments into date-keyed dictionary
  const appointmentsByDate: Record<string, any[]> = {};

  appointmentsData?.data?.forEach((a: any) => {
    const dateKey = a.appointment_date; // Format: 'YYYY-MM-DD'
    const patientName = `${a.patient.user.first_name} ${a.patient.user.last_name}`;
    const time = a.appointment_time;
    if (!appointmentsByDate[dateKey]) {
      appointmentsByDate[dateKey] = [];
    }

    appointmentsByDate[dateKey].push({
      type: "success",
      content: `Patient: ${patientName} @ ${time}`,
    });
  });

  // Step 2: Render appointments on each calendar date
  const dateCellRender = (value: any) => {
    const dateKey = value.format("YYYY-MM-DD");
    const listData = appointmentsByDate[dateKey] || [];

    return (
      <div
        className={
          listData.length > 0 ? "bg-[#5aaa5e] rounded-md font-semibold p-1" : ""
        }
      >
        <ul className="events">
          {listData.map((item, index) => (
            <li key={index}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card title="Schedule">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Calendar dateCellRender={dateCellRender} />
      )}
    </Card>
  );
};

export default Schedule;
