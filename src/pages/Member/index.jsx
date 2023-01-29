import { useCallback, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Layout from "../../components/Layout";
import Card from "../../components/Card";
import EditMemberModal from "pages/EditMemberModal";
import AssociatedProjects from "components/AssociatedProjects";
import ProjectsToAssociated from "components/ProjectsToAssociated";
import CreateAssociationModal from "../CreateAssociationModal";
import UpdateAssociationModal from "pages/UpdateAssociationModal";

import arrowback from "../../assets/arrow-back.svg";

import ProjectService from "../../services/ProjectsService";
import MembersService from "../../services/MembersService";

import { alertUnmappedError, alertUser } from "../../utils/alertUser";
import maskCpf from "../../utils/maskCpf";
import parseMemberTypeToPortuguese from "../../utils/parseMemberTypeToPortuguese";
import maskDate from "../../utils/maskDate";
import CreateServiceAssociationModal from "pages/CreateServiceAssociationModal";
import ServicesService from "services/ServicesService";

export default function Member() {
  const [member, setMember] = useState({});
  const [viewProjectAssociation, setViewProjectAssociation] = useState(true);
  const [memberProjects, setMemberProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectAssociation, setSelectedProjectAssociation] = useState({});

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateAssociationModal, setShowCreateAssociationModal] = useState(false);
  const [showEditAssociationModal, setShowEditAssociationModal] = useState(false);
  const [showServiceAssociationModal, setShowServiceAssociationModal] = useState(false);
  const [servicesAssociates, setServicesAssociates] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const { id: memberId } = params;

  const loadDashboardMember = useCallback(async () => {
    try {
      const { data: member } = await MembersService.getById(memberId);
      const { data: memberProjects } = await ProjectService.getAssociateProjectByMemberId(memberId);
      const { data: projects } = await ProjectService.getAll(true);
      const { data: services } = await ServicesService.getAssociationByMemberId(memberId);
      const memberProjectIds = memberProjects.map(({ projectId }) => projectId);

      const filterNotAssociatedProjects = ({ id }) => {
        return memberProjectIds.every((projectId) => projectId !== id);
      };

      const otherProjects = projects.filter(filterNotAssociatedProjects);
      setServicesAssociates(services);
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
  }, [memberId, navigate]);

  useEffect(() => {
    loadDashboardMember();
  }, [loadDashboardMember, showServiceAssociationModal]);

  function handleToggleAssociationProject() {
    setViewProjectAssociation((state) => !state);
  }

  function navigateToProject(id) {
    navigate(`/project/${id}`);
  }

  return (
    <>
      <Layout>
        <EditMemberModal
          initialState={member}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
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
        <CreateServiceAssociationModal
          member={member}
          showModal={showServiceAssociationModal}
          setShowModal={setShowServiceAssociationModal}
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
            <Title>Informações de Membro</Title>
          </Header>
          <Dashboard>
            <HeaderDashboard>
              <Info status={member.status}>
                <MemberInfo>
                  <Name>{member.name}</Name>
                  <Type>{parseMemberTypeToPortuguese(member.memberType)}</Type>
                  <Status>{member.status ? <p>Ativo</p> : <p>Inativo</p>}</Status>
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
                        E-mail principal: <FontData>{member.email}</FontData>
                      </FormatData>
                      <FormatData>
                        E-mail LSD: <FontData>{member.lsdEmail}</FontData>
                      </FormatData>
                      <FormatData>
                        E-mail secundário: <FontData>{member.secondaryEmail}</FontData>
                      </FormatData>
                      <FormatData>
                        Lattes: <FontData>{member.lattes}</FontData>
                      </FormatData>
                      <FormatData>
                        Sala LSD: <FontData>{member.roomName}</FontData>
                      </FormatData>
                      <FormatData>
                        Tem chave?:
                        {(member.hasKey && <FontData> Sim</FontData>) || <FontData> Não</FontData>}
                      </FormatData>
                    </Data>
                    <PersonalData>
                      <FormatData>
                        Data de nascimento: <FontData>{maskDate(member.birthDate)}</FontData>
                      </FormatData>
                      <FormatData>
                        CPF: <FontData>{maskCpf(member.cpf)}</FontData>
                      </FormatData>
                      <FormatData>
                        RG: <FontData>{member.rg}</FontData>
                      </FormatData>
                      {(member.passport && (
                        <FormatData>
                          Passaporte: <FontData>{member.passport}</FontData>{" "}
                        </FormatData>
                      )) || (
                        <FormatData>
                          Passaporte: <FontData>Não tem informação</FontData>{" "}
                        </FormatData>
                      )}
                    </PersonalData>
                  </ListMemberInfo>

                  <List>
                    <Project>
                      <ProjectTitle>
                        {memberProjects.filter(({ endDate }) => !endDate).length > 0 ? (
                          <h1>Projetos Atuais</h1>
                        ) : (
                          <h1>Nenhum projeto associado</h1>
                        )}
                      </ProjectTitle>
                      {memberProjects
                        .filter(({ endDate }) => !endDate)
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
                                Data que entrou:
                                <FontData> {maskDate(startDate)}</FontData>
                              </FormatData>
                            </div>
                            <div>{project.isActive ? "🟢" : "🔴"} </div>
                          </Card>
                        ))}
                    </Project>

                    <Services>
                      <ServiceHeader>
                        <ServiceTitle>Serviços</ServiceTitle>
                        <Button
                          style={{ padding: "1.5%" }}
                          onClick={() => setShowServiceAssociationModal(true)}
                        >
                          Associar serviço
                        </Button>
                      </ServiceHeader>
                      <Cards>
                        {servicesAssociates.map(({ service }) => (
                          <ServiceCard key={service.id}>{service.name}</ServiceCard>
                        ))}
                      </Cards>
                    </Services>
                  </List>
                </>
              ) : (
                <>
                  <ListProjects>
                    <AssociatedProjects
                      projects={memberProjects}
                      title={
                        memberProjects.length > 0
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
  color: ${({ status }) => (status ? "#069d15" : "red")};
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
  border-bottom: 2px solid #bcbcbc;
  overflow-y: auto;
`;
const ProjectTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  padding: 3% 0;
`;
const Services = styled.div`
  height: 200px;
  padding-top: 2%;
`;
const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ServiceTitle = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
`;
const Cards = styled.div`
  display: flex;
  margin-top: 2%;
  overflow-y: scroll;
  flex-wrap: wrap;
  gap: 3vh;
  max-height: 15vh;
  padding: 1%;
`;
const ServiceCard = styled.div`
  font-weight: 700;
  font-size: 1rem;
  max-width: 15%;
  padding: 2%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;
const ListProjects = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 400px;
  align-items: center;
  padding: 0 3%;
`;
