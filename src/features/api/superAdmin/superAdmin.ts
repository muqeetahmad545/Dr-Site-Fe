import { createApi } from "@reduxjs/toolkit/query/react";
import type { Appointment } from "../../../types/appointment";
import type { Doctor } from "../../../types/doctor";
import { baseQuery } from "../../../util/baseApi";
import type { Admin } from "../../../types/admin";

interface GetDoctorsResponse {
  data: Doctor[];
}

interface GetAdminResponse {
  data: Admin[];
  message: string;
  status: string;
}

interface GetAppointmentsResponse {
  data: Appointment[];
}

export const superAdminApi = createApi({
  reducerPath: "superAdminApi",
  baseQuery,
  endpoints: (builder) => ({
    createAdmin: builder.mutation<GetAdminResponse, Admin>({
      query: (userData) => ({
        url: "/auth/register-admin",
        method: "POST",
        body: userData,
      }),
    }),
    getDoctors: builder.query<GetDoctorsResponse, void>({
      query: () => ({
        url: "/admin/doctors",
        method: "GET",
      }),
    }),
    getPatients: builder.query<GetAdminResponse, void>({
      query: () => ({
        url: "/admin/patients",
        method: "GET",
      }),
    }),
    getAppointments: builder.query<GetAppointmentsResponse, void>({
      query: () => ({
        url: "/admin/appointments",
        method: "GET",
      }),
    }),
    getAdmins: builder.query<GetAdminResponse, void>({
      query: () => ({
        url: "/admin/admins",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetDoctorsQuery,
  useGetPatientsQuery,
  useGetAppointmentsQuery,
  useGetAdminsQuery,
} = superAdminApi;
