export default function maskDateRaw(date) {
  if (!date) return "";

  const cleanDate = date.replace(/[^\d]/g, "");

  const [day, month, year] = [cleanDate.slice(0, 2), cleanDate.slice(2, 4), cleanDate.slice(4, 8)];

  if (cleanDate.length < 3) return day;
  if (cleanDate.length < 5) return `${day}/${month}`;
  if (cleanDate.length < 9) return `${day}/${month}/${year}`;
}
