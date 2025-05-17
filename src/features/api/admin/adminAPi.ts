// adminApi.ts
import { apiSlice } from '../../../store/apiSlice';
import type { Appointment } from '../../../types/appointment';
import type { Doctor } from '../../../types/doctor';
import type { Patient } from '../../../types/patient';

interface GetDoctorsResponse {
  data: Doctor[];
}

interface GetPatientsResponse {
  data: Patient[];
}
interface GetAppointmentsResponse {
  data: Appointment[];
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<GetDoctorsResponse, void>({
      query: () => ({
        url: '/admin/doctors',
        method: 'GET',
      }),
    }),   
    getPatients: builder.query<GetPatientsResponse, void>({
      query: () => ({
        url: '/admin/patients',
        method: 'GET',
      }),
    }),   
    getAppointments: builder.query<GetAppointmentsResponse, void>({
      query: () => ({
        url: '/admin/appointments',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetPatientsQuery,
  useGetAppointmentsQuery,
} = adminApi;
