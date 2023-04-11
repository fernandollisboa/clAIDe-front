import useAuth from "hooks/useAuth";
import { useLocation, Navigate, Outlet, isRouteErrorResponse } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.token ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
