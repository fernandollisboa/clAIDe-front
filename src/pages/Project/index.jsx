import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Card from "../../components/Card";
import Layout from "../../layouts/Layout";
import arrowback from "../../assets/arrow-back.svg";

import ProjectService from "../../services/ProjectsService";

import maskDate from "../../utils/maskDate";
import { alertUnmappedError, alertUser } from "../../utils/alertUser";
import EditProject from "pages/EditProject";
import Loader from "components/Loader";

export default function Project() {
  const [project, setProject] = useState({});
  const [members, setMembers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const loadDashboardProject = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: project } = await ProjectService.getById(id);
      const { data: members } = await ProjectService.getAssociateProjectByProjectId(id);

      setMembers(members);
      setProject({ ...project, id });
    } catch (error) {
      const { status } = error.response;
      if (status === 404) {
        alertUser({ text: "Projeto não encontrado" });
        navigate("/members");
      }
      alertUnmappedError(error);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    loadDashboardProject();
  }, [loadDashboardProject]);

  function navigateToMember(id) {
    navigate(`/members/${id}`);
  }

  return (
    <>
      <Layout>
        <Container>
          <Header>
            <Link
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={arrowback} />
            </Link>
            <Title>Informações do Projeto</Title>
          </Header>
          <EditProject
            initialState={project}
            showModal={showEditModal}
            setShowModal={setShowEditModal}
            onSubmitReload={loadDashboardProject}
            projectId={id}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <Dashboard>
              <HeaderDashboard>
                <Info status={project.isActive}>
                  <div className="project-info">
                    <div className="name">{project.name}</div>
                    <div className="status">
                      <p>{project.isActive ? "Ativo" : "Inativo"}</p>
                    </div>
                  </div>
                </Info>
                <Buttons>
                  <Button onClick={() => setShowEditModal((state) => !state)}> Editar</Button>
                </Buttons>
              </HeaderDashboard>
              <Body>
                <ListInfo>
                  <div className="data">
                    <p>
                      <span className="atribute-title">Código Embrapii: </span>
                      {project.embrapiiCode || "-"}
                    </p>
                    <p>
                      <span className="atribute-title">Financiador: </span>{" "}
                      {project.financier || "-"}
                    </p>
                    <p>
                      <span className="atribute-title">Sala: </span>
                      {project.room || "-"}
                    </p>
                    <p>
                      <span className="atribute-title">Prédio: </span>
                      {project.building || "-"}
                    </p>
                    <p>
                      <span className="atribute-title">Data de Criação: </span>
                      {maskDate(project.creationDate) || "-"}
                    </p>
                    <p>
                      <span className="atribute-title">Data de Término: </span>
                      {maskDate(project.endDate) || "-"}
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
                          <div>
                            <FormatData>
                              Nome: <FontData>{associationMember.member.name}</FontData>
                            </FormatData>
                            <FormatData>
                              Sala: <FontData>{associationMember.member.roomName}</FontData>
                            </FormatData>
                            <FormatData>
                              Email LSD: <FontData>{associationMember.member.lsdEmail}</FontData>
                            </FormatData>
                          </div>
                          <div>{associationMember.member.isActive ? "🟢" : "🔴"}</div>
                        </Card>
                      ))}
                  </div>
                </ListInfo>
                <Members>
                  <span>Alunos</span>
                  {members
                    .filter(
                      (associationMember) => associationMember.member.memberType !== "PROFESSOR"
                    )
                    .map((associationMember) => (
                      <Card
                        key={associationMember.member.id}
                        onClick={() => {
                          navigateToMember(associationMember.member.id);
                        }}
                      >
                        <div>
                          <FormatData>
                            Nome: <FontData>{associationMember.member.name || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            Sala: <FontData>{associationMember.member.roomName || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            Email LSD:{" "}
                            <FontData>{associationMember.member.lsdEmail || "-"}</FontData>
                          </FormatData>
                        </div>
                        <div>{associationMember.member.isActive ? "🟢" : "🔴"}</div>
                      </Card>
                    ))}
                </Members>
              </Body>
            </Dashboard>
          )}
        </Container>
      </Layout>
    </>
  );
}

const FormatData = styled.p`
  padding: 7px;
  font-size: 1rem;
  font-weight: 700;
`;
const FontData = styled.span`
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 88%;
  height: 75vh;
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
      font-weight: 700;
      padding: 0;
    }
  }
`;
const Members = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  margin: 0 auto;
  overflow-y: auto;
  font-weight: 700;
`;
