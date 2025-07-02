import type { Appointment } from "./appointment";

export interface EncryptedResult {
  data: string;
  iv: string;
}
export interface Doctor {
  id: string;
  first_name?: string;
  last_name?: string;
  profile_image?: EncryptedResult | string;
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
    imc?: string | null;
    appointments?: Appointment[];
  };
}

export interface DoctorApiResponse {
  status?: string;
  data?: Doctor;
}

export interface GetAppointmentsResponse {
  data: Appointment[];
  message: String;
}
export interface GetAppointmentsResponseByID {
  data: Appointment;
  message: String;
}
export interface SickLeaveRequest {
  appointmentId: string;
  startDate: string;
  endDate: string;
  reason: string;
  age: string;
}
export interface Medication {
  name?: string;
  drug_name?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
}

export interface Prescription {
  appointmentId?: number;
  notes?: string;
  pharmacy?: string;
  age?: string;
  testsRecommended?: string[];
  medications?: Medication[];
}
