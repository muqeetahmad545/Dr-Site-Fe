import type { Appointment } from "./appointment";

export interface Doctor {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  password?: string;
  address?: string;
  gender?: string;
  specialization?: string;
  pastExperience?: string;
  status?: string;
  doctor: {
    id: number;
    user_id: number;
    specialization: string | null;
    dept: string | null;
    work_history: string | null;
    available_days: string | null;
    doctor_availabilities: string | null;
    available_times: string | null;
  };
}

export interface GetAppointmentsResponse {
  data: Appointment[];
  message: String;
}
export interface SickLeaveRequest {
  appointmentId: string;
  startDate: string;
  endDate: string;
  reason: string;
}
export interface Medication {
  name?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
}

export interface Prescription {
  appointmentId?: number;
  notes?: string;
  pharmacy?: string;
  testsRecommended?: string[];
  medications?: Medication[];
}
