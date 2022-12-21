import { useState, useEffect, useMemo } from "react";
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
  const [isActive, setIsActive] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

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
          nameToBeSearched={projectNameToBeSearched}
          handleChangeSearch={handleChangeSearchProject}
          handleToggleIsActive={handleToggleIsActive}
          url="/newProject"
        />
        <Container>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              onClick={() => {
                navigateToProject(project.id);
              }}
              style={{ width: "300px" }}
            >
              <Info>
                <Name>{project.name}</Name>
                {project.endDate ? (
                  <Data>
                    Data de Fim: <FontData>{transformDate(project.endDate)}</FontData>
                  </Data>
                ) : (
                  <Data>
                    Data de início: <FontData>{transformDate(project.creationDate)}</FontData>
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
  max-width: 68%;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 2vh;
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
  color: #bcbcbc;
`;
