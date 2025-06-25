import { useGetProfileQuery } from "../features/api/auth/authApi";

export const userProfile = () => {
  return useGetProfileQuery();
};
