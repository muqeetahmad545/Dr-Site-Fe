import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../util/baseApi";

interface UploadResponse {
  url: string;
}

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery,
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
