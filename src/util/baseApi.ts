// baseApi.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const userData = localStorage.getItem("user");
    let token = null;

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        token = parsedUser.token;
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      }
    } else {
      token = localStorage.getItem("token");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
