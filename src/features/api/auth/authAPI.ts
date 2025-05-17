import { apiSlice } from '../../../store/apiSlice';
import type { Profile } from '../../../types/profile';

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

// RTK Query API setup
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
    forgotPassword: builder.mutation<ForgotData, ForgotData>({
      query: (userData) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: userData,
      }),
    }),
    resetPassword: builder.mutation<ResetData, ResetData>({
      query: (userData) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body:userData,
      }),
    }),
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),  
    updateProfile: builder.mutation<GetProfileResponse, void>({
      query: (updatedData) => ({
        url: '/me',
        method: 'PUT',
        body: updatedData,
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
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
