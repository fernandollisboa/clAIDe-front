import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("claideToken");
  return token ? <Outlet /> : <Navigate to="/" />;
}
