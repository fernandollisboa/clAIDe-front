import dayjs from "dayjs";

export default function parseDateFromBrToStandard(date) {
  try {
    const [day, month, year] = date.split("/");

    return dayjs(`${month}/${day}/${year}`).format("MM/DD/YYYY");
  } catch (error) {
    console.log("TO NO ERRO VIU");
    console.log({ error });
    //TODO tirar isso aqui
  }
}
