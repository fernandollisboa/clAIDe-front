import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Login from "./pages/Login";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import Teacher from "./pages/Teacher";
import Member from "./pages/Member";
import NewMember from "./pages/NewMember";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newProject" element={<NewProject />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/newMember" element={<NewMember />} />
        <Route path="/members" element={<Member />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
