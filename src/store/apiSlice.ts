import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../util/baseApiHeader';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery, 
  endpoints: () => ({}),
});
