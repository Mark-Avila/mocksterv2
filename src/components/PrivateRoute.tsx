import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  auth: {
    isAuthenticated: boolean;
  };
}

const PrivateRoute = ({ auth: { isAuthenticated }, children }: Props) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
