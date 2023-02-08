import { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";
import { alertUnmappedError, alertUser } from "utils/alertUser";

import maskDate from "../../utils/maskDate";
import ProjectsService from "../../services/ProjectsService";
import Loader from "components/Loader";
import NoDataMessage from "components/NoDataMessage";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectNameToBeSearched, setProjectNameToBeSearched] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [desc, setDesc] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const filteredProjects = useMemo(
    () =>
      projects.filter(({ name }) =>
        name.toLowerCase().includes(projectNameToBeSearched.toLowerCase())
      ),
    [projects, projectNameToBeSearched]
  );

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const projectsList = await ProjectsService.getAll(isActive, desc);

      setProjects(projectsList.data);
    } catch (error) {
      const { status } = error.response;
      if (status === 404) {
        alertUser({ text: "Projeto não encontrado" });
        navigate("/members");
      } else alertUnmappedError(error);
    }
    setIsLoading(false);
  }, [isActive, desc, navigate]);

  useEffect(loadProjects, [loadProjects]);

  function handleToggleIsActive(event) {
    setIsActive(event.target.value);
  }
  function handleToggleDesc() {
    setDesc((prevState) => (prevState === true ? false : true));
  }
  function handleChangeSearchProject(event) {
    setProjectNameToBeSearched(event.target.value);
  }
  function navigateToProject(id) {
    navigate(`/project/${id}`);
  }
  console.log(projects.length);

  return (
    <>
      <Layout>
        <Menu
          type="Projetos"
          desc={desc}
          handleToggleDesc={handleToggleDesc}
          handleToggleIsActive={handleToggleIsActive}
          nameToBeSearched={projectNameToBeSearched}
          handleChangeSearch={handleChangeSearchProject}
          url="/newProject"
        />
        <Container>
          {isLoading ? (
            <Loader />
          ) : !projects.length ? (
            <NoDataMessage />
          ) : (
            <ProjectListContainer>
              {filteredProjects.map((project, index) => (
                <Card
                  key={index}
                  onClick={() => {
                    navigateToProject(project.id);
                  }}
                >
                  <Info>
                    <Name>{project.name}</Name>
                    {project.endDate ? (
                      <Data>
                        Data de Fim: <FontData>{maskDate(project.endDate)}</FontData>
                      </Data>
                    ) : (
                      <Data>
                        Data de início: <FontData>{maskDate(project.creationDate)}</FontData>
                      </Data>
                    )}
                    <Data>
                      Prédio: <FontData>{project.building}</FontData>
                    </Data>
                    <Data>
                      Sala: <FontData>{project.room}</FontData>
                    </Data>
                  </Info>
                  <div>{project.isActive ? "🟢" : "🔴"}</div>
                </Card>
              ))}
            </ProjectListContainer>
          )}
        </Container>
      </Layout>
    </>
  );
}

const Container = styled.div`
  display: flex;

  margin: 0 auto;
  gap: 2vh;
  flex-wrap: wrap;
  margin-top: 1%;
`;
const Info = styled.div`
  p {
    margin-bottom: 4px;
  }
`;
const Name = styled.p`
  font-size: 1rem;
  font-weight: 700;
`;
const Data = styled.p``;
const FontData = styled.span`
  color: #2e2d2d;
`;

const ProjectListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.2vh;
`;
