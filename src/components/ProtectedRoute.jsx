import useAuth from "hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log({ auth });
  console.log({ allowedRoles });

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.token ? (
    <Navigate to={location.pathname} state={{ from: location }} replace />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
