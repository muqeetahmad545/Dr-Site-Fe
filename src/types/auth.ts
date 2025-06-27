import type { Profile } from "./profile";

export interface SignUpData {
  email: string;
  password: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotData {
  email: string;
  message?: string;
}

export interface ResetData {
  email: string;
  password: string;
  otp: string;
  message?: string;
}

// ---------- Response Interfaces ----------
export interface SignUpResponse {
  message?: string;
  access_token: string;
  data: Profile;
  token: string;
}

export interface LoginResponse {
  status: string;
  message?: string;
  data: string;
}

export interface GetProfileResponse {
  data: Profile;
  message?: string;
}
