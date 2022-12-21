import Swal from "sweetalert2";

export function alertUser({ text, type }) {
  Swal.fire({
    title: type === "success" ? "Successo" : "Erro",
    text,
    icon: type || "error",
    iconColor: type === "success" ? "green" : "red",
    confirmButtonText: "Continuar",
  });
}
