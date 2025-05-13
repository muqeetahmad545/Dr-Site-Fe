import { apiSlice } from '../../../store/apiSlice';
import type { User } from '../../../types/user';

interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ForgotData {
  email: string;
}

interface ResetData {
  newPassword: string;
  token: string;
}

interface SignUpResponse {
  access_token: string;
  data: User;
}

// RTK Query API setup
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation<SignUpResponse, SignUpData>({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation<SignUpResponse, LoginData>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotData>({
      query: (values) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: values,
      }),
    }),
    resetPassword: builder.mutation<void, ResetData>({
      query: (values) => ({
        url: `/auth/reset-password?token=${values.token}`,
        method: 'POST',
        body: { newPassword: values.newPassword },
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
