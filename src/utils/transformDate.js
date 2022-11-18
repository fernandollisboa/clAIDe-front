export function dateIsoToDate(date) {
  let [year, day, month] = date.split("-");
  return `${day}/${month.substring(0, 2)}/${year}`;
}
