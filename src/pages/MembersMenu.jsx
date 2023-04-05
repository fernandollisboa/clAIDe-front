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
      allowedRoles: ["SUPPORT", "RECEPTIONIST"],
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
      <Container>
        <DropDownContainer>
          <NavigationsContainer>
            {userNavigationButtons.map(({ path, label }) => (
              <NavigationCard path={path} label={label} key={path} />
            ))}
          </NavigationsContainer>
        </DropDownContainer>
      </Container>
    </Layout>
  );
}

const DropDownContainer = styled(Container)`
  padding-left: 0.5%;
  width: 80%;
`;

const NavigationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;
