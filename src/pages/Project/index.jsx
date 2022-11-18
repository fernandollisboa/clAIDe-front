import { useState, useEffect } from "react";
import styled from "styled-components";
import Menu from "../../components/Menu";
import ProjectsService from "../../services/ProjectsService";
import { dateIsoToDate } from "../../utils/transformDate";

export default function Project() {
  const [projects, setProjects] = useState([]);

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
  return (
    <>
      <Menu />
      <Container>
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="project-info">
              <div className="name">{project.name}</div>
              <div className="creation-date">
                Data de início: <span>{dateIsoToDate(project.creationDate)}</span>
              </div>
              <div className="building">
                Prédio: <span>{project.building}</span>
              </div>
              <div className="room">
                Sala: <span>{project.room}</span>
              </div>
            </div>
            <div className="active">{project.endDate === null ? "🟢" : "🔴"}</div>
          </Card>
        ))}
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
`;
const Card = styled.div`
  display: flex;
  width: 299px;
  height: 115px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 16px;
  justify-content: space-between;
  & + & {
    margin: 22px;
  }
  .project-info {
    font-size: 14px;

    .name {
      font-size: 16px;
      font-weight: 700;
    }
    div {
      margin-bottom: 5px;
    }
    span {
      color: #bcbcbc;
    }
  }
`;
