import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import LoginService from "services/LoginService";
import { useNavigate } from "react-router-dom";

export const setSession = (token) => {
  if (token) {
    localStorage.setItem("claideToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("claideToken");
    delete api.defaults.headers.common.Authorization;
  }
};

const setUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  console.log({ auth });

  const login = async ({ username, password }) => {
    const response = await LoginService.post({ username, password });
    const { token, roles } = response.data;
    setSession(token);
    setUser({ roles });
    setAuth({ token, roles });
  };

  useEffect(() => {
    const fetchUserDataFromLocalStorage = async () => {
      const token = localStorage.getItem("claideToken");
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (token && user) {
        const { roles } = user;
        setSession(token);
        setAuth({ token, roles });
        navigate("/members");
      }
    };

    fetchUserDataFromLocalStorage().catch(console.error);
  }, []);

  const logout = () => {
    setSession(null);
    setAuth(null);
  };

  return <AuthContext.Provider value={{ auth, login, logout }}> {children} </AuthContext.Provider>;
};

export default AuthContext;
