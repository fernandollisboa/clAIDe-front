import { createContext, useState } from "react";
import api from "../services/api";
import LoginService from "services/LoginService";

const updateLocalStorageSession = (token) => {
  if (token) {
    localStorage.setItem("claideToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("claideToken");
    delete api.defaults.headers.common.Authorization;
  }
};

const updateLocalStorageUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("claideToken");
    const user = JSON.parse(window.localStorage.getItem("user"));
    const { roles } = user;
    if (token && user) {
      updateLocalStorageSession(token);
      updateLocalStorageUser({ roles });
      return { token, roles };
    }
    return null;
  });

  const login = async ({ username, password }) => {
    const response = await LoginService.post({ username, password });
    const { token, roles } = response.data;
    setAuth({ token, roles });
    updateLocalStorageSession(token);
    updateLocalStorageUser({ roles });
  };

  const logout = () => {
    updateLocalStorageSession(null);
    updateLocalStorageUser(null);
    setAuth(null);
  };

  return <AuthContext.Provider value={{ auth, login, logout }}> {children} </AuthContext.Provider>;
};

export default AuthContext;
