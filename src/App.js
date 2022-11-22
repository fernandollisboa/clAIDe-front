import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Login from "./pages/Login";
import NewProject from "./pages/NewProject/index.jsx";
import Project from "./pages/Project/index.jsx";
import Teacher from "./pages/Teacher/index.js";
import Member from "./pages/Member/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newProject" element={<NewProject />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/member" element={<Member />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
