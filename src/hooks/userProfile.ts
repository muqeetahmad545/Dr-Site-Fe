import { useGetProfileQuery } from '../features/api/auth/authAPI';

export const userProfile = () => {
  return useGetProfileQuery();
};
