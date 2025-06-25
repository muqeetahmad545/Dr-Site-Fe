// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { apiSlice } from "./apiSlice.js";
import { adminApi } from "../features/api/admin/adminApi.js";
import { superAdminApi } from "../features/api/superAdmin/superAdminApi.js";
import { doctorApi } from "../features/api/doctor/doctorApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(adminApi.middleware)
      .concat(doctorApi.middleware)
      .concat(superAdminApi.middleware),
});
