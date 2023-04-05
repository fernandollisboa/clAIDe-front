import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export function alertUser({ text, type = "error" }) {
  toast(text, { type });
}

export function alertUnmappedError(error) {
  const { status } = error.response;
  if (status === 401) {
    // setSession(null); // TODO revisar isso
    alertUser({ text: "Token expirado, por favor logue novamente", type: "warning" });
    return <Navigate to="/" replace={true} />;
  } else {
    const text = "Erro não mapeado";
    alertUser({ text });
  }
}
