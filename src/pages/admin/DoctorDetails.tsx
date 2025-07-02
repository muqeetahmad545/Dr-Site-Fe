import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Tag, Spin, Avatar } from "antd";
import { useGetDoctorByIdQuery } from "../../features/api/admin/adminApi";
import { UserOutlined } from "@ant-design/icons";

import {
  decryptBase64,
  SECRET_KEY,
  type EncryptedResult,
} from "../../helper/Crypto";

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useGetDoctorByIdQuery(id as string);
  const [profileImage, setProfileImage] = useState<EncryptedResult | null>(
    null
  );

  const doctor = data?.data;

  // Populate profileImage from doctor data
  useEffect(() => {
    refetch();

    const img = doctor?.profile_image;

    if (img && typeof img === "object" && "data" in img && "iv" in img) {
      setProfileImage({
        data: img.data,
        iv: img.iv,
      });
    }
  }, [refetch, doctor]);

  const decryptedProfileImage = profileImage
    ? decryptBase64(profileImage.data, profileImage.iv, SECRET_KEY)
    : null;

  if (isLoading) return <Spin />;
  if (!doctor) return <p>Doctor not found.</p>;

  const getNextWeekdayDate = (startDate: Date, weekday: string): Date => {
    const daysMap: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const targetDay = daysMap[weekday.toLowerCase()];
    const date = new Date(startDate);

    if (targetDay === undefined) return date;

    while (date.getDay() !== targetDay) {
      date.setDate(date.getDate() + 1);
    }

    return date;
  };

  return (
    <Card title="Doctor Details">
      <div className="flex justify-end items-center">
        <Avatar
          size={100}
          src={
            decryptedProfileImage?.startsWith("data:image/")
              ? decryptedProfileImage
              : undefined
          }
          icon={<UserOutlined />}
          style={{ marginBottom: 8 }}
        />
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">
          {doctor.first_name} {doctor.last_name}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{doctor.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">
          {doctor.phone || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {doctor.gender || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={doctor.status === "active" ? "green" : "red"}>
            {doctor.status || "inactive"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {doctor.address || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="IMC">
          {doctor.doctor?.imc || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Specialization">
          {doctor.doctor?.specialization || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Availability">
          {doctor.doctor?.doctor_availabilities
            ? (
                Object.entries(
                  doctor.doctor.doctor_availabilities
                ) as unknown as [string, string[]][]
              ).map(([day, times]) => {
                return (
                  <div key={day} style={{ marginBottom: "1rem" }}>
                    <strong>
                      {day.charAt(0).toUpperCase() + day.slice(1)}:
                    </strong>
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {times.map((time) => {
                        const today = new Date();
                        const nextDate = getNextWeekdayDate(today, day);
                        const formattedDate = nextDate
                          .toISOString()
                          .split("T")[0];

                        const isBooked = doctor.doctor?.appointments?.some(
                          (appt: any) =>
                            appt.appointment_date === formattedDate &&
                            appt.appointment_time === time
                        );

                        return (
                          <Tag
                            key={`${day}-${time}`}
                            color={isBooked ? "red" : "green"}
                            style={{ fontWeight: "bold" }}
                          >
                            {time} {isBooked ? "(Booked)" : ""}
                          </Tag>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DoctorDetails;
