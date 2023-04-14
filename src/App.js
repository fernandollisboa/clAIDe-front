import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NewProject from "./pages/NewProject";
import ProjectsList from "./pages/ProjectsList.jsx";
import NewMember from "./pages/NewMember";
import MembersList from "pages/MembersList";
import Member from "./pages/Member";
import Activity from "./pages/Activity";
import Project from "./pages/Project";
import MembersMenu from "pages/MembersMenu";
import ProtectedRoute from "components/ProtectedRoute";
import RegistrationRequests from "pages/RegistrationRequests";
import RegistrationsRefused from "pages/RegistrationsRefused";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="support" element={<ProtectedRoute allowedRoles={["SUPPORT"]} />}>
        <Route path="activity-log" element={<Activity />} />
        <Route path="registration-requests" element={<RegistrationRequests />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["SUPPORT", "RECEPTIONIST", "PROFESSOR"]} />}>
        <Route path="home" element={<Navigate to="/members/menu" replace />} />
        <Route path="members/menu" element={<MembersMenu />} />
        <Route path="members/new" element={<NewMember />} />
        <Route path="members" element={<MembersList />} />,
        <Route path="members/:id" element={<Member />} />
        <Route path="projects/new" element={<NewProject />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/:id" element={<Project />} />
        <Route path="members/registration-requests-refused" element={<RegistrationsRefused />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
