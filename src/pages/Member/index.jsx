import { useCallback, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import arrowback from "../../assets/arrow-back.svg";

import ProjectService from "../../services/ProjectsService";
import MembersService from "../../services/MembersService";

import { alertUnmappedError, alertUser } from "../../utils/alertUser";
import maskCpf from "../../utils/maskCpf";
import { transformDate } from "../../utils/transformDate";
import { setSession } from "contexts/AuthContext";
import EditMemberModal from "pages/EditMember";

export default function Member() {
  const [member, setMember] = useState({});
  const [viewProjectButton, setviewProjectButton] = useState(true);
  const [activeProjects, setActiveProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const params = useParams();
  const { id: memberId } = params;
  const navigate = useNavigate();

  const loadDashboardMember = useCallback(async () => {
    try {
      const { data: memberData } = await MembersService.getById(memberId);
      const { data: memberProjectsData } = await ProjectService.getAssociateProjectByMemberId(
        memberId
      );

      setMember(memberData);
      setActiveProjects(memberProjectsData);
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
      await ProjectService.associateMemberWithProject(
        member.id,
        selectedProject.id,
        transformDate(startDate),
        transformDate(endDate)
      );
      setStartDate(null);
      setEndDate(null);
      // setModalOpen(false);
      alertUser({ text: "Projeto associado!", type: "success" });
    } catch (error) {
      alertUser({ text: error.response.data.message, type: "error" });
    }
  }

  async function handleToggleAssociationProject() {
    setviewProjectButton((prevState) => (prevState ? false : true));
    if (viewProjectButton) {
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
  return (
    <>
      <Layout>
        {/* <Modal modalOpen={modalOpen}>
          <ModalContainer>
            <span>
              Tem certeza que deseja associar o aluno <strong> {member.name} </strong> ao projeto
              <strong> {selectedProject.name}</strong>?
            </span>
            <InputsModal>
              <DatePicker
                placeholderText="Data de inicio"
                className="date"
                required
                onChange={setStartDate}
                value={transformDate(startDate)}
              />

              <DatePicker
                placeholderText="Data de fim"
                className="date"
                onChange={setEndDate}
                value={transformDate(endDate)}
              />

              <Button
                style={{ padding: "1%", height: "52px" }}
                onClick={() => {
                  setModalOpen(false);
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
        </Modal> */}

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
                  <Type>{member.memberType}</Type>
                  <Status>{(member.status && <p>Ativo</p>) || <p>Inativo</p>}</Status>
                </MemberInfo>
                <Username>{member.username}</Username>
              </Info>
              <Buttons>
                {viewProjectButton ? (
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
                    Tem chave:
                    {(member.hasKey && <FontData>Tem a chave</FontData>) || (
                      <FontData>Tem a chave</FontData>
                    )}
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
                      Passaporte: <FontData>Nao tem informacao</FontData>{" "}
                    </FormatData>
                  )}
                </PersonalData>
              </ListInfo>
              {viewProjectButton ? (
                <List>
                  <Project>
                    <ProjectTitle>
                      {activeProjects.length > 1 ? (
                        <h1>Projetos Atuais</h1>
                      ) : (
                        <h1>Projeto Atual</h1>
                      )}
                    </ProjectTitle>
                    {activeProjects.map((projectAssociation) => (
                      <CardProjectActive
                        key={projectAssociation.id}
                        onClick={() => {
                          navigateToProject(projectAssociation.project.id);
                        }}
                      >
                        <div>
                          <span>
                            Nome: <FontData>{projectAssociation.project.name}</FontData>
                          </span>
                          <span>
                            Sala:{" "}
                            <FontData>{projectAssociation.project.room || "Sem sala"}</FontData>
                          </span>
                          <span>
                            Data de inicio:{" "}
                            <FontData>{transformDate(projectAssociation.startDate)}</FontData>
                          </span>
                        </div>
                        <div>{projectAssociation.project.isActive ? "🟢" : "🔴"} </div>
                      </CardProjectActive>
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
                  <p>Associar à Novo Projeto</p>
                  <div className="card-body">
                    {projects.map((project) => (
                      <CardProject
                        key={project.id}
                        onClick={() => {
                          // setModalOpen(true);
                          setSelectedProject(project);
                        }}
                      >
                        <div className="info">
                          <span>
                            Nome: <p>{project.name}</p>
                          </span>
                          <span>
                            Sala: <p>{project.room || "Sem sala"}</p>
                          </span>
                          <span>
                            Predio: <p>{project.building || "Sem predio"}</p>
                          </span>
                        </div>
                        <div>{project.isActive ? "🟢" : "🔴"}</div>
                      </CardProject>
                    ))}
                  </div>
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
  justify-content: flex-end;
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
const FormatData = styled.span`
  padding: 7px;
  font-size: 1rem;
  display: flex;
  font-weight: 700;
`;
const FontData = styled.p`
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
const CardProjectActive = styled.div`
  margin: 0 auto;
  width: 60%;
  display: flex;
  justify-content: space-between;
  padding: 3%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  span {
    display: flex;
    font-weight: 700;
    margin-bottom: 4%;
  }
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
  p {
    font-weight: 700;
    font-size: 1.4rem;
    margin-bottom: 3%;
  }
  .card-body {
    width: 100%;
    overflow-y: auto;
  }
  .name {
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 30px;
  }
`;

const CardProject = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  font-size: 1rem;

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

      font-weight: 700;
      p {
        font-size: 1rem;
        font-weight: 400;
      }
    }
  }
`;
