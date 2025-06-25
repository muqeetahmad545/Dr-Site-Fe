import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../util/baseApi";
import type { Admin } from "../../../types/admin";

interface GetAdminResponse {
  data: Admin[];
  message: string;
  status: string;
}

export const superAdminApi = createApi({
  reducerPath: "superAdminApi",
  baseQuery,
  endpoints: (builder) => ({
    createAdmin: builder.mutation<GetAdminResponse, Admin>({
      query: (userData) => ({
        url: "/auth/register-admin",
        method: "POST",
        body: userData,
      }),
    }),
    getAdmins: builder.query<GetAdminResponse, void>({
      query: () => ({
        url: "/admin/admins",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateAdminMutation, useGetAdminsQuery } = superAdminApi;
