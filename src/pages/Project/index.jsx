import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Layout from "../../components/Layout";

import ProjectService from "../../services/ProjectsService";
import { transformDate } from "../../utils/transformDate";

export default function Project() {
  const [project, setProject] = useState({});
  const params = useParams();
  console.log(project);
  async function loadDashboardProject() {
    try {
      const projectId = params.id;
      const { data: project } = await ProjectService.getById(projectId);

      setProject(project);
    } catch (error) {
      //   alertUser({ text: error.response.data.message, type: "error" });
    }
  }
  useEffect(() => {
    loadDashboardProject();
  }, [params.id]);

  return (
    <>
      <Layout>
        <Container>
          <Title>Informações do Projeto</Title>
          <Dashboard>
            <Header>
              <Info status={project.isActive}>
                <div className="project-info">
                  <div className="name">{project.name}</div>
                  <div className="status">
                    {(project.isActive && <p>Ativo</p>) || <p>Inativo</p>}
                  </div>
                </div>
              </Info>
              <Buttons>
                <Button> Editar</Button>
              </Buttons>
            </Header>
            <Body>
              <ListInfo>
                <div className="data">
                  <span>
                    Data de Criacao: <p>{transformDate(project.creationDate)}</p>
                  </span>
                  <span>
                    Data de Termino: <p>{transformDate(project.endDate) || "Sem data"}</p>
                  </span>
                  <span>
                    Predio: <p>{project.building || "Sem predio"}</p>
                  </span>
                  <span>
                    Sala: <p>{project.room || "Sem sala"}</p>
                  </span>
                  <span>
                    Codigo Embrapii: <p>{project.embrapiiCode || "Sem codigo"}</p>
                  </span>
                  <span>
                    Financiador: <p>{project.financier || "Sem financiador"}</p>
                  </span>
                </div>
                <div className="list-teachers">
                  <span>
                    Professores: <p>Manel</p>
                  </span>
                </div>
              </ListInfo>

              <List>
                <Members>
                  <span>Alunos</span>
                </Members>
              </List>
            </Body>
          </Dashboard>
        </Container>
      </Layout>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 88%;
  height: 653px;
  background: #fff;
  border-radius: 10px;
  padding: 1% 2%;
`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 3rem;
  margin: 0 auto;
`;
const Dashboard = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #bcbcbc;
  padding-bottom: 1%;
`;
const Info = styled.div`
  width: 500px;
  .project-info {
    display: flex;
    align-items: center;
    .name {
      font-weight: 700;
      font-size: 2.5rem;
      line-height: 50px;
      margin-right: 2%;
    }
    .status {
      font-weight: 800;
      font-size: 0.7rem;
      color: ${({ status }) => (status ? "#069d15" : "red")};
      background: #f6f5fc;
      border-radius: 4px;
      padding: 0.5vh;
    }
  }
`;
const Buttons = styled.div`
  width: 300px;
  display: flex;
  justify-content: end;
`;
const Button = styled.button`
  border: 2px solid #131313;
  text-decoration: none;
  border-radius: 4px;
  padding: 4%;
  background: #fff;
  font-weight: 700;
  font-size: 1rem;
  margin-right: 5%;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1%;
`;
const ListInfo = styled.div`
  width: 50%;
  border-right: 2px solid #bcbcbc;
  padding-right: 2%;
  span & span {
    padding: 7px;
  }
  span {
    padding: 7px;
    font-size: 1rem;
    display: flex;
    font-weight: 700;
    p {
      font-weight: 400;
    }
  }
  .data {
    height: 200px;
    border-bottom: 2px solid #bcbcbc;
  }
  .list-teachers {
    height: 200px;
    padding-top: 2%;
  }
`;
const List = styled.div`
  width: 50%;
  padding: 0 2%;
  display: flex;
  justify-content: center;
`;
const Members = styled.div`
  span {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
