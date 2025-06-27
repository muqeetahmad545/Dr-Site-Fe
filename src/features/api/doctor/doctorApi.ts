import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../util/baseApi";
import type {
  GetAppointmentsResponse,
  Prescription,
  Response,
  SickLeaveRequest,
} from "../../../types";

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
    generateSickLeave: builder.mutation<Response, SickLeaveRequest>({
      query: (body) => ({
        url: "/doctor/generate-sick-leave",
        method: "POST",
        body,
      }),
    }),
    generatePrescription: builder.mutation<Response, Prescription>({
      query: (body) => ({
        url: "/doctor/prescription",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAppointmentsDoctorQuery,
  useGenerateSickLeaveMutation,
  useGeneratePrescriptionMutation,
} = doctorApi;
