import { apiSlice } from "../../../store/apiSlice";

import type {
  LoginData,
  LoginResponse,
  SignUpData,
  SignUpResponse,
  GetProfileResponse,
  ForgotData,
  ResetData,
  Profile,
} from "../../../types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation<SignUpResponse, SignUpData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginData>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),

    forgotPassword: builder.mutation<{ message: string }, ForgotData>({
      query: (userData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: userData,
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, ResetData>({
      query: (userData) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: userData,
      }),
    }),

    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),

    verifyToken: builder.mutation<GetProfileResponse, string>({
      query: (token) => ({
        url: `/auth/verify-email/${token}`,
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation<GetProfileResponse, Partial<Profile>>({
      query: (updatedData) => ({
        url: "/me",
        method: "PUT",
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
  useVerifyTokenMutation,
} = authApi;
