import axios from "axios";
import useAuth from "hooks/useAuth";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  rejectUnauthorized: false,
});

Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
Api.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export function setAuthToken(token) {
  Api.defaults.headers.common["Authorization"] = "";
  delete Api.defaults.headers.common["Authorization"];

  if (token) {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default Api;
