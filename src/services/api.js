import axios from "axios";
const options = { rejectUnauthorized: false };

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  rejectUnauthorized: false,
});

Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
Api.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export default Api;
