import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Layout from "../../components/Layout";
import arrowback from "../../assets/arrow-back.svg";

import ProjectService from "../../services/ProjectsService";

import { transformDate } from "../../utils/transformDate";
import { alertUser } from "../../utils/alertUser";

export default function Project() {
  const [project, setProject] = useState({});
  const [members, setMembers] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  async function loadDashboardProject() {
    try {
      const projectId = params.id;
      const { data: project } = await ProjectService.getById(projectId);
      const { data: members } = await ProjectService.getAssociateProjectByProjectId(projectId);
      console.log(members);
      setMembers(members);
      setProject(project);
    } catch (error) {
      alertUser({ text: error.response.data.message, type: "error" });
    }
  }
  useEffect(() => {
    loadDashboardProject();
  }, [params.id]);
  function navigateToMember(id) {
    navigate(`/member/${id}`);
  }
  return (
    <>
      <Layout>
        <Container>
          <Header>
            <Link to="/projects">
              <img src={arrowback} />
            </Link>
            <Title>Informações do Projeto</Title>
          </Header>

          <Dashboard>
            <HeaderDashboard>
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
            </HeaderDashboard>
            <Body>
              <ListInfo>
                <div className="data">
                  <p>
                    <span className="atribute-title">Data de Criação: </span>
                    {transformDate(project.creationDate)}
                  </p>
                  <p>
                    <span className="atribute-title">Data de Término: </span>
                    {transformDate(project.endDate) || "Sem data"}
                  </p>
                  <p>
                    <span className="atribute-title">Prédio: </span>
                    {project.building || "Sem prédio"}
                  </p>
                  <p>
                    <span className="atribute-title">Sala: </span>
                    {project.room || "Sem sala"}
                  </p>
                  <p>
                    <span className="atribute-title">Código Embrapii: </span>
                    {project.embrapiiCode || "Sem código"}
                  </p>
                  <p>
                    <span className="atribute-title">Financiador: </span>{" "}
                    {project.financier || "Sem financiador"}
                  </p>
                </div>
                <div className="list-teachers">
                  <span>Professores</span>
                  {members
                    .filter(
                      (associationMember) => associationMember.member.memberType === "PROFESSOR"
                    )
                    .map((associationMember) => (
                      <Card
                        key={associationMember.member.id}
                        onClick={() => {
                          navigateToMember(associationMember.member.id);
                        }}
                      >
                        <div className="info">
                          <span className="name">
                            Nome: <p>{associationMember.member.name}</p>
                          </span>
                          <span>
                            Sala: <p>{associationMember.member.roomName}</p>
                          </span>
                          <span>
                            Email LSD: <p>{associationMember.member.lsdEmail}</p>
                          </span>
                        </div>
                        <div>{associationMember.member.isActive ? "🟢" : "🔴"}</div>
                      </Card>
                    ))}
                </div>
              </ListInfo>
              <Members>
                <span>Alunos</span>
                {members
                  .filter((associationMember) => associationMember.member.memberType === "STUDENT")
                  .map((associationMember) => (
                    <Card
                      key={associationMember.member.id}
                      onClick={() => {
                        navigateToMember(associationMember.member.id);
                      }}
                    >
                      <div className="info">
                        <span className="name">
                          Nome: <p>{associationMember.member.name}</p>
                        </span>
                        <span>
                          Sala: <p>{associationMember.member.roomName}</p>
                        </span>
                        <span>
                          Email LSD: <p>{associationMember.member.lsdEmail}</p>
                        </span>
                      </div>
                      <div>{associationMember.member.isActive ? "🟢" : "🔴"}</div>
                    </Card>
                  ))}
              </Members>
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
const Header = styled.div`
  display: flex;
`;
const Dashboard = styled.div``;
const HeaderDashboard = styled.div`
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
  font-size: 1rem;
  .atribute-title {
    font-weight: 700;
  }
  p {
    padding: 7px;
    font-weight: 400;
  }

  .data {
    height: 200px;
    border-bottom: 2px solid #bcbcbc;
  }
  .list-teachers {
    height: 200px;
    padding-top: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    span {
      padding: 0;
    }
  }
`;
const Members = styled.div`
  width: 50%;
  padding: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  margin: 0 auto;
  overflow-y: auto;
  font-weight: 700;
`;
const Card = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    transition: all 200ms ease-in;
    transform: scale(0.93);
  }
  & + & {
    margin-bottom: 1%;
  }
  .info {
    span {
      display: flex;
      font-size: 1rem;
      font-weight: 700;
      p {
        font-weight: 400;
      }
    }
  }
`;
