import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle.js";
import Login from "./pages/Login";
import NewProject from "./pages/NewProject";
import Projects from "./pages/Projects";
import NewMember from "./pages/NewMember";
import Members from "./pages/Members";
import Member from "./pages/Member";
import Activity from "./pages/Activity";
import Project from "./pages/Project";
import RequireAuth from "components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route element={<RequireAuth allowedRoles={["ADMIN", "PROFESSOR"]} />}>
        <Route path="activity" element={<Activity />} />
        <Route path="newProject" element={<NewProject />} />
        <Route path="projects" element={<Projects />} />
        <Route path="project/:id" element={<Project />} />
        <Route path="newMember" element={<NewMember />} />
        <Route path="members" element={<Members />} />
        <Route path="member/:id" element={<Member />} />
      </Route>
    </Routes>
  );
}

export default App;
