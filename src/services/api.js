import axios from "axios";

const Api = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
Api.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export default Api;
