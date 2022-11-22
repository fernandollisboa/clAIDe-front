import dayjs from "dayjs";

export function transformDate(date) {
  return dayjs(date).format("DD/MM/YYYY");
}
