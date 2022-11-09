import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Login from "./pages/Login";
import NewProject from "./pages/NewProject/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newProject" element={<NewProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
