import { useCallback, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Layout from "../layouts/Layout";
import Card from "../components/Card";
import EditMemberModal from "pages/EditMemberModal";
import AssociatedProjects from "components/AssociatedProjects";
import ProjectsToAssociated from "components/ProjectsToAssociated";
import CreateAssociationModal from "./CreateAssociationModal";
import UpdateAssociationModal from "pages/UpdateAssociationModal";

import arrowback from "../assets/arrow-back.svg";

import ProjectService from "../services/ProjectsService";
import MembersService from "../services/MembersService";

import { alertUnmappedError, alertUser } from "../utils/alertUser";
import maskCpf from "../utils/maskCpf";
import parseMemberTypeToPortuguese from "../utils/parseMemberTypeToPortuguese";
import maskDate from "../utils/maskDate";
import Loader from "components/Loader";
import ServiceList from "components/ServiceList";

export default function Member() {
  const [member, setMember] = useState({});
  const [viewProjectAssociation, setViewProjectAssociation] = useState(true);
  const [memberProjects, setMemberProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectAssociation, setSelectedProjectAssociation] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateAssociationModal, setShowCreateAssociationModal] = useState(false);
  const [showEditAssociationModal, setShowEditAssociationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const { id: memberId } = params;

  const loadDashboardMember = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: member } = await MembersService.getById(memberId);
      const { data: memberProjects } = await ProjectService.getAssociateProjectByMemberId(memberId);
      const { data: projects } = await ProjectService.getAll(true);

      const memberProjectIds = memberProjects.map(({ projectId }) => projectId);

      const filterNotAssociatedProjects = ({ id }) => {
        return memberProjectIds.every((projectId) => projectId !== id);
      };

      const otherProjects = projects.filter(filterNotAssociatedProjects);

      setProjects(otherProjects);
      setMember(member);
      setMemberProjects(memberProjects);
    } catch (err) {
      const { status } = err.response;

      if (status === 404) {
        alertUser({ text: "Membro não encontrado" });
        navigate("/members");
      } else alertUnmappedError(err);
    }
    setIsLoading(false);
  }, [memberId]);

  useEffect(() => {
    loadDashboardMember();
  }, [loadDashboardMember]);

  function handleToggleAssociationProject() {
    setViewProjectAssociation((state) => !state);
  }

  function navigateToProject(id) {
    navigate(`/projects/${id}`);
  }

  return (
    <>
      <Layout>
        <EditMemberModal
          initialState={member}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          onSubmitReload={loadDashboardMember}
        />
        <UpdateAssociationModal
          member={member}
          showModal={showEditAssociationModal}
          setShowModal={setShowEditAssociationModal}
          project={selectedProjectAssociation}
          initialState={selectedProjectAssociation}
        />
        <CreateAssociationModal
          member={member}
          project={selectedProjectAssociation}
          showModal={showCreateAssociationModal}
          setShowModal={setShowCreateAssociationModal}
        />
        <Container>
          <Header>
            <Link
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={arrowback} />
            </Link>
            <HeaderTitle>Informações de Membro</HeaderTitle>
          </Header>
          {isLoading ? (
            <Loader />
          ) : (
            <Dashboard>
              <>
                <HeaderDashboard>
                  <Info status={member.status}>
                    <MemberInfo>
                      <Name>{member.name}</Name>
                      <Type>{parseMemberTypeToPortuguese(member.memberType)}</Type>
                      <Status isActive={member.isActive}>
                        {member.isActive ? <p>Ativo</p> : <p>Inativo</p>}
                      </Status>
                    </MemberInfo>
                    <Username>{member.username}</Username>
                  </Info>
                  <Buttons>
                    {viewProjectAssociation ? (
                      <>
                        <Button onClick={() => setShowEditModal((state) => !state)}> Editar</Button>
                        <Button onClick={handleToggleAssociationProject}>Gerenciar projetos</Button>
                      </>
                    ) : (
                      <Button onClick={handleToggleAssociationProject}> Voltar</Button>
                    )}
                  </Buttons>
                </HeaderDashboard>
                <Body>
                  {viewProjectAssociation ? (
                    <>
                      <ListMemberInfo>
                        <Data>
                          <FormatData>
                            E-mail principal: <FontData>{member.email || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            E-mail LSD: <FontData>{member.lsdEmail || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            E-mail secundário: <FontData>{member.secondaryEmail || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            Lattes: <FontData>{member.lattes || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            Sala LSD: <FontData>{member.roomName || " Sem sala"}</FontData>
                          </FormatData>
                          <FormatData>
                            Tem a chave da sala?{" "}
                            <FontData>{member.hasKey ? "Sim" : "Não"}</FontData>
                          </FormatData>
                        </Data>
                        <PersonalData>
                          <FormatData>
                            Data de nascimento:{" "}
                            <FontData>{maskDate(member.birthDate) || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            CPF: <FontData>{maskCpf(member.cpf) || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            RG: <FontData>{member.rg || "-"}</FontData>
                          </FormatData>
                          <FormatData>
                            Passaporte: <FontData>{member.passport || "-"}</FontData>
                          </FormatData>
                        </PersonalData>
                      </ListMemberInfo>

                      <List>
                        <Project>
                          <Title>
                            {memberProjects.filter(({ isActive }) => isActive).length ? (
                              <h1>Projetos Atuais</h1>
                            ) : (
                              <h1>Nenhum projeto associado</h1>
                            )}
                          </Title>
                          <ProjectsContainer>
                            {memberProjects
                              .filter(({ isActive }) => isActive)
                              .map(({ project, startDate }) => (
                                <Card
                                  key={project.id}
                                  onClick={() => {
                                    navigateToProject(project.id);
                                  }}
                                >
                                  <div>
                                    <FormatData>
                                      Nome: <FontData>{project.name}</FontData>
                                    </FormatData>
                                    <FormatData>
                                      Sala:
                                      <FontData> {project.roomName || " Sem sala"}</FontData>
                                    </FormatData>
                                    <FormatData>
                                      Data de ingresso:
                                      <FontData> {maskDate(startDate)}</FontData>
                                    </FormatData>
                                  </div>
                                  <div>{project.isActive ? "🟢" : "🔴"} </div>
                                </Card>
                              ))}
                          </ProjectsContainer>
                        </Project>
                        <ServiceList member={member} onSubmitReload={loadDashboardMember} />
                      </List>
                    </>
                  ) : (
                    <>
                      <ListProjects>
                        <AssociatedProjects
                          projects={memberProjects}
                          title={
                            memberProjects.length
                              ? "Editar projetos associados"
                              : "Nenhum projeto associado"
                          }
                          editShowModal={setShowEditAssociationModal}
                          setProjectAssociation={setSelectedProjectAssociation}
                        />
                      </ListProjects>
                      <ListProjects>
                        <ProjectsToAssociated
                          projects={projects}
                          title="Associar a um projeto"
                          editShowModal={setShowCreateAssociationModal}
                          setProjectAssociation={setSelectedProjectAssociation}
                        />
                      </ListProjects>
                    </>
                  )}
                </Body>
              </>
            </Dashboard>
          )}
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
  height: 75vh;
  background: #fff;
  border-radius: 10px;
  padding: 1% 2%;
`;
const HeaderTitle = styled.h1`
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
`;
const MemberInfo = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 50px;
`;
const Type = styled.div`
  font-weight: 800;
  font-size: 0.7rem;
  color: #486fbd;
  background: #f6f5fc;
  border-radius: 4px;
  padding: 0.5vh;
  margin-left: 1%;
  margin-right: 1%;
`;
const Status = styled.div`
  font-weight: 800;
  font-size: 0.7rem;
  color: ${({ isActive }) => (isActive ? "#069d15" : "red")};
  background: #f6f5fc;
  border-radius: 4px;
  padding: 0.5vh;
`;
const Username = styled.span`
  font-weight: 400;
  font-size: 1rem;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.54);
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
const ListMemberInfo = styled.div`
  width: 50%;
  border-right: 2px solid #bcbcbc;
  padding-right: 2%;
`;
const Data = styled.div`
  height: 200px;
  border-bottom: 2px solid #bcbcbc;
`;
const PersonalData = styled.div`
  height: 200px;
  padding-top: 2%;
`;
const FormatData = styled.p`
  padding: 7px;
  font-size: 1rem;
  font-weight: 700;
`;
const FontData = styled.span`
  font-weight: 400;
`;
const List = styled.div`
  width: 50%;
  padding: 0 2%;
`;
const Project = styled.div`
  height: 200px;

  overflow-y: auto;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  padding: 3% 0;
`;

const ProjectsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ListProjects = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3%;
`;
