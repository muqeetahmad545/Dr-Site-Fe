import { createApi } from "@reduxjs/toolkit/query/react";
import type { Appointment } from "../../../types/appointment";
import type { Doctor } from "../../../types/doctor";
import type { Patient } from "../../../types/patient";
import { baseQuery } from "../../../util/baseApi";

interface GetDoctorsResponse {
  data: Doctor[];
}

interface GetPatientsResponse {
  data: Patient[];
}

interface GetAppointmentsResponse {
  data: Appointment[];
  message: String;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  endpoints: (builder) => ({
    getDoctors: builder.query<GetDoctorsResponse, void>({
      query: () => ({
        url: "/admin/doctors",
        method: "GET",
      }),
    }),
    getPatients: builder.query<GetPatientsResponse, void>({
      query: () => ({
        url: "/admin/patients",
        method: "GET",
      }),
    }),
    getAppointments: builder.query<GetAppointmentsResponse, void>({
      query: () => ({
        url: "/appointment/appointments",
        method: "GET",
      }),
    }),
    getAvailableDoctorsByTime: builder.mutation({
      query: (body) => ({
        url: "/admin/doctors",
        method: "POST",
        body,
      }),
    }),
    assignMeetingLink: builder.mutation({
      query: ({ appointmentId, linkExpiresAt, doctorId, meetingLink }) => ({
        url: `/appointment/${appointmentId}`,
        method: "PUT",
        body: {
          doctor_id: doctorId,
          meeting_link: meetingLink,
          linkExpiresAt: linkExpiresAt,
        },
      }),
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetPatientsQuery,
  useGetAppointmentsQuery,
  useGetAvailableDoctorsByTimeMutation,
  useAssignMeetingLinkMutation,
} = adminApi;
