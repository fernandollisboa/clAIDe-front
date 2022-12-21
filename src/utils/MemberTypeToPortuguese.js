export default function MemberTypeToPortuguese(memberType) {
  if (memberType === "STUDENT") return "ESTUDANTE";
  if (memberType === "PROFESSOR") return "PROFESSOR";
  if (memberType === "SUPPORT") return "SUPORTE";
  if (memberType === "EXTERNAL") return "EXTERNO";
  if (memberType === "ADMIN") return "ADMINISTRADOR";
  else return "";
}
