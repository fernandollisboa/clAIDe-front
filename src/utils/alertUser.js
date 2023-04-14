import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export function alertUser({ text, type = "error" }) {
  toast(text, { type });
}

export function alertUnmappedError(error) {
  const { status } = error.response;

  if (status === 401 || status === 403) {
    localStorage.removeItem("claideToken");
    alertUser({ text: "Token expirado, por favor logue novamente", type: "warning" });
    return <Navigate to="/login" replace />;
  } else {
    const text = "Erro não mapeado";
    alertUser({ text });
  }
}
