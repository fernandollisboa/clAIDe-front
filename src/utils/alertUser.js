import Swal from "sweetalert2";
import { setSession } from "contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function alertUser({ text, type = "error" }) {
  const titleMsgObj = {
    success: "Sucesso",
    error: "Erro",
    warning: "Atenção",
    question: "Falha",
  };
  const iconColorObj = { success: "green", error: "red", warning: "yellow", question: "orange" };

  Swal.fire({
    title: titleMsgObj[type],
    text,
    icon: type,
    iconColor: iconColorObj[type],
    confirmButtonText: "Continuar",
  });
}

export function alertUnmappedError(error) {
  const { status } = error.response;
  if (status === 401) {
    setSession(null);
    alertUser({ text: "Token expirado, por favor logue novamente", type: "warning" });
    return <Navigate to="/" replace={true} />;
  } else {
    const text = "Erro não mapeado";
    alertUser({ text });
  }
}
