import { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";
import { alertUnmappedError, alertUser } from "utils/alertUser";

import maskDate from "../../utils/maskDate";
import ProjectsService from "../../services/ProjectsService";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [projectNameToBeSearched, setProjectNameToBeSearched] = useState("");
  const [isActive, setIsActive] = useState("");
  const [desc, setDesc] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = useMemo(
    () =>
      projects.filter(({ name }) =>
        name.toLowerCase().includes(projectNameToBeSearched.toLowerCase())
      ),
    [projects, projectNameToBeSearched]
  );

  const loadProjects = useCallback(async () => {
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
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              onClick={() => {
                navigateToProject(project.id);
              }}
              style={{ width: "30%", height: "20%" }}
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
        </Container>
      </Layout>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  margin-top: 1%;
  justify-content: space-between;
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
