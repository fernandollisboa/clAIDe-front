import axios from "axios";

// eslint-disable-next-line no-unused-vars
const Api = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

export default Api;
