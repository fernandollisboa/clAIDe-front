import { createContext, useState } from "react";
import { setAuthToken } from "../services/api";
import LoginService from "services/LoginService";
import { decodeToken } from "react-jwt";

const updateLocalStorageSession = (token) => {
  if (token) localStorage.setItem("claideToken", token);
  else localStorage.removeItem("claideToken");

  setAuthToken(token);
};
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("claideToken");
    if (token) {
      const { roles } = decodeToken(token);
      updateLocalStorageSession(token);
      return { token, roles };
    }
    return null;
  });

  const login = async ({ username, password }) => {
    const response = await LoginService.post({ username, password });
    const { token } = response.data;
    const { roles } = decodeToken(token);
    setAuth({ token, roles });
    updateLocalStorageSession(token);
  };

  const logout = () => {
    updateLocalStorageSession(null);
    setAuth(null);
  };

  return <AuthContext.Provider value={{ auth, login, logout }}> {children} </AuthContext.Provider>;
};

export default AuthContext;
