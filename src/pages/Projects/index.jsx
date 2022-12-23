import { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";

import { transformDate } from "../../utils/transformDate";
import ProjectsService from "../../services/ProjectsService";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [projectNameToBeSearched, setProjectNameToBeSearched] = useState("");
  const [isActive, setIsActive] = useState(true);
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
    } catch (err) {
      alert(err);
    }
  }, [isActive, desc]);

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
            >
              <div className="info">
                <div className="name">{project.name}</div>
                {project.endDate ? (
                  <div>
                    Data de Fim: <span>{transformDate(project.endDate)}</span>
                  </div>
                ) : (
                  <div>
                    Data de início: <span>{transformDate(project.creationDate)}</span>
                  </div>
                )}
                <div>
                  Prédio: <span>{project.building}</span>
                </div>
                <div>
                  Sala: <span>{project.room}</span>
                </div>
              </div>
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
  max-width: 68%;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 2vh;
  margin-top: 1%;
`;
