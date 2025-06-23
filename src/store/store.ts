// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { apiSlice } from "./apiSlice.js";
import { adminApi } from "../features/api/admin/adminAPi.js";
import { superAdminApi } from "../features/api/superAdmin/superAdmin.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(adminApi.middleware)
      .concat(superAdminApi.middleware),
});
