// import { createContext, useReducer, useEffect } from "react";

// import api from "../services/api";

// // export const setSession = (accessToken) => {
// //   if (accessToken) {
// //     localStorage.setItem("claideToken", accessToken);
// //     api.defaults.headers.common.Authorization = accessToken;
// //   } else {
// //     localStorage.removeItem("claideToken");
// //     delete api.defaults.headers.common.Authorization;
// //   }
// // };

// const setUser = (user) => {
//   if (user) {
//     localStorage.setItem("user", JSON.stringify(user));
//   } else {
//     localStorage.removeItem("user");
//   }
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "INIT": {
//       const { isAuthenticated, user } = action.payload;

//       return {
//         ...state,
//         isAuthenticated,
//         isInitialised: true,
//         user,
//       };
//     }
//     case "LOGIN": {
//       const { user } = action.payload;

//       return {
//         ...state,
//         isAuthenticated: true,
//         user,
//       };
//     }
//     case "LOGOUT": {
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//       };
//     }
//     case "REGISTER": {
//       const { user } = action.payload;

//       return {
//         ...state,
//         isAuthenticated: true,
//         user,
//       };
//     }
//     default: {
//       return { ...state };
//     }
//   }
// };

// const initialState = {
//   isAuthenticated: false,
//   user: null,
// };

// const AuthContext = createContext({
//   ...initialState,
//   method: "JWT",
//   login: () => Promise.resolve(),
//   // eslint-disable-next-line prettier/prettier
//   logout: () => {},
//   register: () => Promise.resolve(),
// });

// export default AuthContext;

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const login = async (email, password) => {
//     const response = await api.post("/login/", {
//       email,
//       password,
//     });
//     const user = response.data;
//     const auth = response?.headers?.authorization;

//     setSession(auth);
//     setUser(user);

//     dispatch({
//       type: "LOGIN",
//       payload: {
//         user,
//       },
//     });
//   };

//   const register = async (email, username, password) => {
//     const response = await api.post("/api/auth/register", {
//       email,
//       username,
//       password,
//     });

//     const { token } = response.data;

//     setSession(token);

//     dispatch({
//       type: "REGISTER",
//       payload: {
//         token,
//       },
//     });
//   };

//   const logout = () => {
//     setSession(null);
//     dispatch({ type: "LOGOUT" });
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const accessToken = window.localStorage.getItem("claideToken");
//         if (accessToken) {
//           setSession(accessToken);
//           dispatch({
//             payload: {
//               isAuthenticated: true,
//             },
//           });
//         } else {
//           dispatch({
//             payload: {
//               isAuthenticated: false,
//             },
//           });
//         }
//       } catch (err) {
//         // eslint-disable-next-line
//         dispatch({
//           payload: {
//             isAuthenticated: false,
//           },
//         });
//       }
//     })();
//   }, [state.accessToken]);

//   if (!state.isInitialised) {
//     return <div>loading</div>;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         login,
//         logout,
//         register,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
