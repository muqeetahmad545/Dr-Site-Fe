import type { Doctor, Medication, SickLeaveRequest } from "./doctor";
import type { Patient } from "./patient";

export interface Appointment {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  address?: string;
  gender?: string;
  age?: number;
  appointment_date?: string | any;
  appointment_time?: string;
  notes?: string;
  symptoms?: string;
  consultingDoctor?: string;
  status?: boolean | string;
  patient?: Patient;
  doctor?: Doctor;
  prescribed_Medicines?: Medication[];
  sickLeaves?: SickLeaveRequest[] | SickLeaveRequest;
}
