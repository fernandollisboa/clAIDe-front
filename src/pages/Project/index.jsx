import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import { transformDate } from "../../utils/transformDate";
import ProjectsService from "../../services/ProjectsService";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [projectNameToBeSearched, setProjectNameToBeSearched] = useState("");

  const filteredProjects = useMemo(
    () =>
      projects.filter(({ name }) =>
        name.toLowerCase().includes(projectNameToBeSearched.toLowerCase())
      ),
    [projects, projectNameToBeSearched]
  );

  async function loadProjects() {
    try {
      const projectsList = await ProjectsService.getAll();

      setProjects(projectsList.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleChangeSearchProject(event) {
    setProjectNameToBeSearched(event.target.value);
  }
  return (
    <>
      <Layout>
        <Menu>
          <h1>Projetos cadastrados</h1>
          <InputSearch
            value={projectNameToBeSearched}
            placeholder="Pesquisar Projeto..."
            type="text"
            onChange={handleChangeSearchProject}
          />
          <div className="buttons">
            <Link to="/newProject">Cadastrar Projeto </Link>
          </div>
        </Menu>
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

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 68%;
  margin: 1% auto;
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
  .buttons {
    a {
      text-decoration: none;
      border: 2px solid #131313;
      border-radius: 4px;
      padding: 1vh 2vh;
      color: #131313;
      font-weight: 700;
      font-size: 1rem;
    }
  }
`;
const InputSearch = styled.input`
  width: 30%;
  background: #fff;
  border: 2px solid #fff;
  height: 50px;
  border-radius: 25px;
  font-size: 1rem;
  justify-content: center;
  padding: 0 2%;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 68%;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 2vh;
  margin-top: 1%;
  overflow: scroll;
  max-height: 70vh;
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
