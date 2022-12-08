import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Login from "./pages/Login";
import NewProject from "./pages/NewProject";
import Projects from "./pages/Projects";
import Teacher from "./pages/Teacher";
import NewMember from "./pages/NewMember";
import Members from "./pages/Members";
import Member from "./pages/Member";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newProject" element={<NewProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/newMember" element={<NewMember />} />
        <Route path="/members" element={<Members />} />
        <Route path="/member/:id" element={<Member />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
