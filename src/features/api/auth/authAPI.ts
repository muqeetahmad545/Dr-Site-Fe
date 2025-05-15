import { apiSlice } from '../../../store/apiSlice';
import type { User } from '../../../types/user';

interface SignUpData {
  role: string;
  email: string;
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

interface SignUpResponse {
  access_token: string;
  data: User;
  token: string;
}

interface LoginResponse {
  status: string;
  message: string;
  data: string; 
}

// RTK Query API setup
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation<SignUpResponse, SignUpData>({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginData>({
      query: (userData) => ({
        url: '/user/login',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation<ForgotData, ForgotData>({
      query: (userData) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body: userData,
      }),
    }),
    resetPassword: builder.mutation<ResetData, ResetData>({
      query: (userData) => ({
        url: `/user/reset-password`,
        method: 'POST',
        body:userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateAccountMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
