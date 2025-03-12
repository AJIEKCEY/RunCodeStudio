import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthProviderProps } from "../types";

export const ProtectedRoute = ({ children } : AuthProviderProps) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
