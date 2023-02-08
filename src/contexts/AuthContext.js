// import { createContext, useReducer, useEffect } from "react";

import api from "../services/api";

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("claideToken", accessToken);
    api.defaults.headers.common.Authorization = accessToken;
  } else {
    localStorage.removeItem("claideToken");
    delete api.defaults.headers.common.Authorization;
  }
};
