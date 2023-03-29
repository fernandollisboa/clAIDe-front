import styled from "styled-components";

import Layout from "components/Layout";
import Container from "components/Container";
import NavigationCard from "components/NavigationCard";
import useAuth from "hooks/useAuth";

export default function MembersMenu() {
  const { auth } = useAuth();
  const navigationButtons = [
    { path: "/members", label: "Listar Membros" },
    { path: "/projects", label: "Listar Projetos" },
    { path: "/members/new", label: "Cadastrar Membro" },
    { path: "/projects/new", label: "Cadastrar Projeto" },
    {
      path: "/support/registration-requests",
      label: "Solicitações de Cadastro",
      allowedRoles: ["SUPPORT"],
    },
  ];

  function filterButtonsByRole() {
    return navigationButtons.filter((item) => {
      const { allowedRoles } = item;
      if (allowedRoles) return auth?.roles?.find((role) => allowedRoles.includes(role));
      else return item;
    });
  }

  const userNavigationButtons = filterButtonsByRole();

  return (
    <Layout>
      <DropDownContainer>
        <NavigationsContainer>
          {userNavigationButtons.map(({ path, label }) => (
            <NavigationCard path={path} label={label} key={path} />
          ))}
        </NavigationsContainer>
      </DropDownContainer>
    </Layout>
  );
}

const DropDownContainer = styled(Container)`
  justify-content: left;
  padding-left: 0.5%;
`;

const NavigationsContainer = styled.div`
  justify-content: top;
  width: 100%;
  height: 100%;
`;