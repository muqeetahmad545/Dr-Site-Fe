import type { Doctor } from "./doctor";
import type { Patient } from "./patient";
import type { Profile } from "./profile";

export interface GetDoctorsResponse {
  data: Doctor[];
}

export interface GetPatientsResponse {
  data: Patient[];
}

export interface Admin {
  data: Profile[];
}
