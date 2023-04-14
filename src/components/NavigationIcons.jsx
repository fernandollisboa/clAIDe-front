import { Link } from "react-router-dom";
import styled from "styled-components";

import useAuth from "hooks/useAuth";

export default function NavigationIcons() {
  const { auth } = useAuth();

  const navigations = [
    {
      id: "members",
      label: "Membros",
      allowedRoles: ["SUPPORT", "PROFESSOR", "RECEPTIONIST"],
      path: "/members",
    },
    {
      id: "projects",
      label: "Projetos",
      allowedRoles: ["SUPPORT", "PROFESSOR", "RECEPTIONIST"],
      path: "/projects",
    },
    {
      id: "activities-log",
      label: "Log de Atividades",
      allowedRoles: [],
      path: "/support/activity-log",
    },
  ];

  function filterNavigationsByRole() {
    return navigations.filter(({ allowedRoles }) =>
      auth?.roles?.find((role) => allowedRoles.includes(role))
    );
  }

  const userNavigations = filterNavigationsByRole();

  return userNavigations.map(({ path, id, label }) => (
    <StyledLink to={path} key={id}>
      {label}
    </StyledLink>
  ));
}

const StyledLink = styled(Link)`
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  font-style: bold;
  text-decoration: none;
  color: #131313;
  transition: 0.3s;
  border-bottom: 0.1px solid transparent;
  :hover {
    background-color: #edeaead4;
    border-color: #486fbd;
    border-radius: 5px;
    color: #486fbd;
  }
`;
