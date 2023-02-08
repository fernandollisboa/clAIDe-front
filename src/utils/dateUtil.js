import dayjs from "dayjs";

export const MINIMUM_REQUIRED_AGE = 15;

export function getTodaySubtractYears(years) {
  return dayjs().subtract(years, "year").toDate();
}
