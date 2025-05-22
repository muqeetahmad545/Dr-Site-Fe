import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

type Props = {
  role: "admin" | "doctor" | "patient";
  children: JSX.Element;
};

export const ProtectedRoute = ({ role, children }: Props) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return <Navigate to="/login" />;
  if (currentUser.role !== role) return <Navigate to="/unauthorized" />;
  return children;
};
