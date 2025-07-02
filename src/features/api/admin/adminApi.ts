import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../../../util/baseApi";
import type {
  Doctor,
  DoctorApiResponse,
  GetAppointmentsResponse,
  GetDoctorsResponse,
  GetPatientsResponse,
} from "../../../types";

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
    getAdminAppointments: builder.query<GetAppointmentsResponse, void>({
      query: () => ({
        url: "/admin/appointments",
        method: "GET",
      }),
    }),
    getDoctorById: builder.query<DoctorApiResponse, string>({
      query: (id) => ({
        url: `/admin/doctor/${id}`,
        method: "GET",
      }),
    }),
    updateDoctorById: builder.mutation<Doctor, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/admin/doctor/${id}`,
        method: "PUT",
        body: { status },
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
  useGetAdminAppointmentsQuery,
  useGetAvailableDoctorsByTimeMutation,
  useAssignMeetingLinkMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorByIdMutation,
} = adminApi;
