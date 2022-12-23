import Swal from "sweetalert2";

export function alertUser({ text, type = "error" }) {
  const titleMsgObj = { success: "Sucesso", error: "Erro", warning: "Atenção" };
  const iconColorObj = { success: "green", error: "red", warning: "yellow" };

  Swal.fire({
    title: titleMsgObj[type],
    text,
    icon: type,
    iconColor: iconColorObj[type],
    confirmButtonText: "Continuar",
  });
}

export function alertUnmappedError(err) {
  console.log(err);
  const text = "Erro não mapeado";
  alertUser({ text });
}
