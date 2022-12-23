import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token"); // TO-DO trocar para contexto
  return token ? <Outlet /> : <Navigate to="/" />;
}
