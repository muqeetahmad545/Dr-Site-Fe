// apiSlice.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../util/baseApi'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
