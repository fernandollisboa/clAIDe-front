import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import Layout from "../../components/Layout";
import Menu from "../../components/Menu";

import { transformDate } from "../../utils/transformDate";
import ProjectsService from "../../services/ProjectsService";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [projectNameToBeSearched, setProjectNameToBeSearched] = useState("");
  const [isActive, setIsActive] = useState("");
  const [desc, setDesc] = useState("");

  const filteredProjects = useMemo(
    () =>
      projects.filter(({ name }) =>
        name.toLowerCase().includes(projectNameToBeSearched.toLowerCase())
      ),
    [projects, projectNameToBeSearched]
  );

  async function loadProjects() {
    try {
      const projectsList = await ProjectsService.getAll(isActive, desc);

      setProjects(projectsList.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    loadProjects();
  }, [isActive, desc]);

  function handleToggleIsActive(event) {
    setIsActive(event.target.value);
  }
  function handleToggleDesc() {
    setDesc((prevState) => (prevState === true ? false : true));
  }
  function handleChangeSearchProject(event) {
    setProjectNameToBeSearched(event.target.value);
  }
  return (
    <>
      <Layout>
        <Menu
          type="Projetos"
          desc={desc}
          handleToggleDesc={handleToggleDesc}
          nameToBeSearched={projectNameToBeSearched}
          handleChangeSearch={handleChangeSearchProject}
          handleToggleIsActive={handleToggleIsActive}
          url="/newProject"
        />
        <Container>
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <div className="project-info">
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
              <div>{project.endDate === null ? "🟢" : "🔴"}</div>
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
const Card = styled.div`
  display: flex;
  width: 23%;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 1.2%;
  justify-content: space-between;
  .project-info {
    font-size: 0.8rem;

    .name {
      font-size: 1rem;
      font-weight: 700;
    }
    div {
      margin-bottom: 3%;
    }
    span {
      color: #bcbcbc;
    }
  }
`;
