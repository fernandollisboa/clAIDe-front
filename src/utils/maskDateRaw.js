export default function maskDateRaw(date) {
  return date?.replace(/^(\d{2})(\d{2})/, "$1/$2/");
}
