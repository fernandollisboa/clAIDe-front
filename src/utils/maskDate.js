import dayjs from "dayjs";

export default function maskDate(date) {
  if (date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  return null;
}
