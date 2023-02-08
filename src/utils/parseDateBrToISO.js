import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function parseDateBrToISO(date) {
  const dateParsed = dayjs(date, "DD/MM/YYYY", true);
  if (!dayjs(date, "DD/MM/YYYY", true).isValid()) return "";

  return dateParsed.toISOString();
}
