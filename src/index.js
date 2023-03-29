import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
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
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
