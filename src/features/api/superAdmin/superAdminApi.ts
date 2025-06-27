import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../util/baseApi";
import type { Response, Admin } from "../../../types";

export const superAdminApi = createApi({
  reducerPath: "superAdminApi",
  baseQuery,
  endpoints: (builder) => ({
    createAdmin: builder.mutation<Response, Admin>({
      query: (userData) => ({
        url: "/auth/register-admin",
        method: "POST",
        body: userData,
      }),
    }),
    getAdmins: builder.query<Response, void>({
      query: () => ({
        url: "/admin/admins",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateAdminMutation, useGetAdminsQuery } = superAdminApi;
