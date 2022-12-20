import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Layout from "../../components/Layout";
import Modal from "../../components/Modal";

import ProjectService from "../../services/ProjectsService";
import MembersService from "../../services/MembersService";

import { alertUser } from "../../utils/alertUser";
import maskCpf from "../../utils/maskCpf";
import { transformDate } from "../../utils/transformDate";

export default function Member() {
  const [member, setMember] = useState({});
  const [viewProjectButton, setviewProjectButton] = useState(true);
  const [activeProjects, setActiveProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const params = useParams();

  async function loadDashboardMember() {
    try {
      const memberId = params.id;
      const { data: member } = await MembersService.getById(memberId);
      const { data: projects } = await ProjectService.getAssociateProjectMemberId(memberId);

      setMember(member);
      setActiveProjects(projects);
    } catch (error) {
      alertUser({ text: error.response.data.message, type: "error" });
    }
  }
  useEffect(() => {
    loadDashboardMember();
  }, [params.id, projects]);

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
      setModalOpen(false);
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

  return (
    <>
      <Layout>
        <Modal modalOpen={modalOpen}>
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
        </Modal>
        <Container>
          <Title>Informações de Membro</Title>
          <Dashboard>
            <Header>
              <Info status={member.status}>
                <div className="member-info">
                  <div className="name">{member.name}</div>
                  <div className="type">{member.memberType}</div>
                  <div className="status">{(member.status && <p>Ativo</p>) || <p>Inativo</p>}</div>
                </div>
                <Username>{member.username}</Username>
              </Info>
              <Buttons>
                {viewProjectButton ? (
                  <>
                    <Button> Editar</Button>
                    <Button onClick={handleToggleAssociationProject}>Gerenciar projetos</Button>
                  </>
                ) : (
                  <Button onClick={handleToggleAssociationProject}> Voltar</Button>
                )}
              </Buttons>
            </Header>
            <Body>
              <ListInfo>
                <div className="data">
                  <span>
                    E-mail principal: <p>{member.email}</p>
                  </span>
                  <span>
                    E-mail LSD: <p>{member.lsdEmail}</p>
                  </span>
                  <span>
                    E-mail secundário: <p>{member.secondaryEmail}</p>
                  </span>
                  <span>
                    Lattes: <p>{member.lattes}</p>
                  </span>
                  <span>
                    Sala LSD: <p>{member.roomName}</p>
                  </span>
                  <span>
                    Tem chave: {(member.hasKey && <p>Tem a chave</p>) || <p>Tem a chave</p>}
                  </span>
                </div>
                <div className="personal-data">
                  <span>
                    Data de nascimento: <p>{member.birthDate}</p>
                  </span>
                  <span>
                    CPF: <p>{maskCpf(member.cpf)}</p>
                  </span>
                  <span>
                    RG: <p>{member.rg}</p>
                  </span>
                  {(member.passport && (
                    <span>
                      Passaporte: <p>{member.passport}</p>{" "}
                    </span>
                  )) || (
                    <span>
                      Passaporte: <p>Nao tem informacao</p>{" "}
                    </span>
                  )}
                </div>
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
                      <CardProjectActive key={projectAssociation.id}>
                        <div>
                          <span>
                            Nome: <p>{projectAssociation.project.name}</p>
                          </span>
                          <span>
                            Sala: <p>{projectAssociation.project.room || "Sem sala"}</p>
                          </span>
                          <span>
                            Data de inicio: <p>{transformDate(projectAssociation.startDate)}</p>
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
                          setModalOpen(true);
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
  .member-info {
    display: flex;
    align-items: center;
    .name {
      font-weight: 700;
      font-size: 2.5rem;
      line-height: 50px;
    }
    .type {
      font-weight: 800;
      font-size: 0.7rem;
      color: #486fbd;
      background: #f6f5fc;
      border-radius: 4px;
      padding: 0.5vh;
      margin-left: 1%;
      margin-right: 1%;
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
  .personal-data {
    height: 200px;
    padding-top: 2%;
  }
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
  span {
    display: flex;
    font-weight: 700;
    margin-bottom: 4%;

    p {
      font-weight: 400;
    }
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
      font-size: 1rem;
      font-weight: 700;
      p {
        font-size: 1rem;
        font-weight: 400;
      }
    }
  }
`;
