import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";

dayjs.extend(dayjsPluginUTC);

export default function maskDate(date) {
  if (date) {
    const dayjsDate = dayjs(date).format("DD/MM/YYYY");
    return dayjsDate;
  }
  return null;
}
