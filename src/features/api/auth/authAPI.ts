import { apiSlice } from '../../../store/apiSlice';
import type { Profile } from '../../../types/profile';

// ---------- Request Interfaces ----------
interface SignUpData {
  role: string;
  email: string;
  imc?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ForgotData {
  email: string;
  message?: string;
}

interface ResetData {
  email: string;
  password: string;
  otp: string;
  message?: string;
}

// ---------- Response Interfaces ----------
interface SignUpResponse {
  access_token: string;
  data: Profile;
  token: string;
}

interface LoginResponse {
  status: string;
  message: string;
  data: string; 
}

interface GetProfileResponse {
  data: Profile;
}

// ---------- Auth API ----------
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation<SignUpResponse, SignUpData>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginData>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
    }),

    forgotPassword: builder.mutation<{ message: string }, ForgotData>({
      query: (userData) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: userData,
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, ResetData>({
      query: (userData) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: userData,
      }),
    }),

    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<GetProfileResponse, Partial<Profile>>({
      query: (updatedData) => ({
        url: '/me',
        method: 'PUT',
        body: updatedData,
      }),
    }),
  }),
  overrideExisting: true, 
});

// ---------- Export Hooks ----------
export const {
  useCreateAccountMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
