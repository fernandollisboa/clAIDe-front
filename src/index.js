import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthProvider } from "contexts/AuthProvider.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          style={{ fontSize: "1.2rem", fontStyle: "bold" }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
