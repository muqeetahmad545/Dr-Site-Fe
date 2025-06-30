// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Card, Descriptions, Tag, Spin } from "antd";

// const DoctorDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data, isLoading } = useGetDoctorByIdQuery(id);

//   const doctor = data?.data;

//   if (isLoading) return <Spin />;

//   if (!doctor) return <p>Doctor not found.</p>;

//   return (
//     <Card title="Doctor Details">
//       <Descriptions bordered column={1}>
//         <Descriptions.Item label="Name">
//           {doctor.first_name} {doctor.last_name}
//         </Descriptions.Item>
//         <Descriptions.Item label="Email">{doctor.email}</Descriptions.Item>
//         <Descriptions.Item label="Phone">
//           {doctor.phone || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Gender">
//           {doctor.gender || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Status">
//           <Tag color={doctor.status === "active" ? "green" : "red"}>
//             {doctor.status}
//           </Tag>
//         </Descriptions.Item>
//         <Descriptions.Item label="Specialization">
//           {doctor.doctor?.specialization || "N/A"}
//         </Descriptions.Item>
//         <Descriptions.Item label="Availability">
//           {doctor.doctor?.doctor_availabilities?.length
//             ? doctor.doctor.doctor_availabilities.map(
//                 (a: any, index: number) => (
//                   <div key={index}>
//                     {a.day.charAt(0).toUpperCase() + a.day.slice(1)} @ {a.time}
//                   </div>
//                 )
//               )
//             : "N/A"}
//         </Descriptions.Item>
//       </Descriptions>
//     </Card>
//   );
// };

// export default DoctorDetails;
