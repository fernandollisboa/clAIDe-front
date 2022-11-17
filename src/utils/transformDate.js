export function dateIsoToDate(date) {
  if (date) {
    let [year, month, day] = date.split("/")[0].split("-");
    return `${day}/${month}/${year}`;
  }
}
