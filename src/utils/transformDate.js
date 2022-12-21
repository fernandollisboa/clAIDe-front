import dayjs from "dayjs";

export function transformDate(date) {
  if (date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
  return null;
}
