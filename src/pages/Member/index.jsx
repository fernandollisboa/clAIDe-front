import { useCallback, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import FormDate from "../../components/FormDate";
import arrowback from "../../assets/arrow-back.svg";

import ProjectService from "../../services/ProjectsService";
import MembersService from "../../services/MembersService";

import { alertUnmappedError, alertUser } from "../../utils/alertUser";
import maskCpf from "../../utils/maskCpf";
import parseMemberTypeToPortuguese from "../../utils/parseMemberTypeToPortuguese";
import { transformDate } from "../../utils/transformDate";
import { setSession } from "contexts/AuthContext";
import EditMemberModal from "pages/EditMember";

export default function Member() {
  const [member, setMember] = useState({});
  const [viewProjectAssociation, setViewProjectAssociation] = useState(true);
  const [memberProjects, setMemberProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [modalAssociationOpen, setModalAssociationOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const params = useParams();
  const { id: memberId } = params;
  const navigate = useNavigate();

  const loadDashboardMember = useCallback(async () => {
    try {
      const memberId = params.id;
      const { data: member } = await MembersService.getById(memberId);
      const { data: projects } = await ProjectService.getAssociateProjectByMemberId(memberId);
      setMember(member);
      setMemberProjects(projects);
    } catch (error) {
      const { status } = error.response;

      if (status === 404) {
        alertUser({ text: "Membro não encontrado" });
        navigate("/members");
      }
      if (status === 401) {
        setSession(null);
        alertUser({ text: "Token expirado, por favor logue novamente", type: "warning" });
        navigate("/");
      } else alertUnmappedError(error);
    }
  }, [memberId, projects]);

  useEffect(() => {
    loadDashboardMember();
  }, [loadDashboardMember]);

  async function associateStudentWithProject() {
    try {
      await ProjectService.updateAssociateMemberWithProject(
        member.id,
        selectedProject.id,
        transformDate(startDate),
        transformDate(endDate)
      );
      setStartDate(null);
      setEndDate(null);
      setModalAssociationOpen(false);
      alertUser({ text: "Projeto atualizado!", type: "success" });
    } catch (error) {
      if (error.response.status === 404) {
        alertUser({
          text: `${member.name} e ${selectedProject.name} não encontrados`,
          type: "error",
        });
      }
      if (error.response.status === 422) {
        alertUser({
          text: `Data de inicio não pode ser antes do projeto iniciar e data de fim não pode ser depois do projeto terminar `,
          type: "error",
        });
      }
    }
  }
  async function handleToggleAssociationProject() {
    setViewProjectAssociation((prevState) => (prevState ? false : true));
    if (viewProjectAssociation) {
      try {
        const { data } = await ProjectService.getAll(true);

        setProjects(data);
      } catch (error) {
        alert(error);
      }
    } else {
      setProjects([]);
    }
  }
  function navigateToProject(id) {
    navigate(`/project/${id}`);
  }
  console.log(startDate);
  return (
    <>
      <Layout>
        <Modal modalOpen={modalAssociationOpen}>
          <ModalContainer>
            <span>
              Tem certeza que deseja editar o aluno <strong> {member.name} </strong> ao projeto
              <strong> {selectedProject.name}</strong>?
            </span>
            <InputsModal>
              <FormDate
                placeholder="Data de início"
                className="date"
                onChange={setStartDate}
                value={startDate}
              />

              <FormDate
                placeholder="Data de fim"
                className="date"
                onChange={setEndDate}
                value={endDate}
              />

              <Button
                style={{ padding: "1%", height: "52px" }}
                onClick={() => {
                  setModalAssociationOpen(false);
                  setSelectedProject({});
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Cancelar
              </Button>
              <Button
                style={{ border: "2px solid red", color: "red", padding: "1%", height: "52px" }}
                onClick={associateStudentWithProject}
              >
                Confirmar
              </Button>
            </InputsModal>
          </ModalContainer>
        </Modal>

        <EditMemberModal
          initialState={member}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
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
                  <>
                    <Button onClick={handleToggleAssociationProject}> Voltar</Button>
                    <Button
                      onClick={() => {
                        setModalAssociationOpen(true);
                      }}
                    >
                      {" "}
                      Associar projeto
                    </Button>
                  </>
                )}
              </Buttons>
            </HeaderDashboard>
            <Body>
              <ListInfo>
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
                    Data de nascimento: <FontData>{member.birthDate}</FontData>
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
              </ListInfo>
              {viewProjectAssociation ? (
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
                              <FontData> {project.room || " Sem sala"}</FontData>
                            </FormatData>
                            <FormatData>
                              Data que entrou:
                              <FontData> {transformDate(startDate)}</FontData>
                            </FormatData>
                          </div>
                          <div>{project.isActive ? "🟢" : "🔴"} </div>
                        </Card>
                      ))}
                  </Project>

                  <Services>
                    <ServiceHeader>
                      <ServiceTitle>Servicos</ServiceTitle>
                      <AssociationSelectService>
                        <option value="">Associar Servico</option>
                        <option value="">GitHub</option>
                        <option value="">Cloud</option>
                      </AssociationSelectService>
                    </ServiceHeader>
                    <Cards>
                      <ServiceCard>Card 1</ServiceCard>
                      <ServiceCard>Card 1</ServiceCard>
                    </Cards>
                  </Services>
                </List>
              ) : (
                <ListProjects>
                  <ProjectTitle>Editar Projetos associados</ProjectTitle>
                  <ContainerAssociation>
                    {memberProjects.map(({ project, startDate, endDate }) => (
                      <Card
                        key={project.id}
                        onClick={() => {
                          setModalAssociationOpen(true);
                          setSelectedProject(project);
                          setStartDate(startDate);
                          setEndDate(endDate);
                        }}
                      >
                        <div>
                          <FormatData>
                            Nome: <FontData>{project.name}</FontData>
                          </FormatData>
                          <FormatData>
                            Data de início:
                            <FontData>{transformDate(startDate)}</FontData>
                          </FormatData>
                          <FormatData>
                            Data de término:
                            <FontData>{transformDate(endDate) || "Não terminou"}</FontData>
                          </FormatData>
                        </div>
                        <div>{!endDate ? "🟢" : "🔴"}</div>
                      </Card>
                    ))}
                  </ContainerAssociation>
                </ListProjects>
              )}
            </Body>
          </Dashboard>
        </Container>
      </Layout>
    </>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  strong {
    font-weight: 700;
  }
`;
const InputsModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .date {
    margin-right: 5%;
    border: 2px solid black;
    outline: 0;
    padding: 0 5%;
    font-size: 1rem;
    height: 52px;
  }
`;
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
const ListInfo = styled.div`
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
const AssociationSelectService = styled.select`
  width: 40%;
  border: 2px solid #131313;
  text-decoration: none;
  border-radius: 4px;
  padding: 1.2vh 2vh;
  background: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
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
const ContainerAssociation = styled.div`
  width: 100%;
  overflow-y: auto;
`;
