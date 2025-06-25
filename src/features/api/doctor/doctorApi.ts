import { createApi } from "@reduxjs/toolkit/query/react";
import type { Appointment } from "../../../types/appointment";
import { baseQuery } from "../../../util/baseApi";

interface GetAppointmentsResponse {
  data: Appointment[];
  message: String;
}

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery,
  endpoints: (builder) => ({
    getAppointmentsDoctor: builder.query<GetAppointmentsResponse, void>({
      query: () => ({
        url: "/doctor/appointments",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAppointmentsDoctorQuery } = doctorApi;
