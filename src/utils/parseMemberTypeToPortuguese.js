export default function parseMemberTypeToPortuguese(memberType) {
  if (memberType === "STUDENT") return "ESTUDANTE";
  if (memberType === "PROFESSOR") return "PROFESSOR";
  if (memberType === "SUPPORT") return "SUPORTE";
  if (memberType === "EXTERNAL") return "EXTERNO";
  else return "";
}
