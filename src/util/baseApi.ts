// src/api/baseApi.ts
import { LOCAL_STORAGE_VARIABLES } from '../constants/localStoreVars';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAuthToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_VARIABLES.AUTH_SESSION);
};

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API,
  prepareHeaders: (headers) => {
    const token = getAuthToken();

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
