import styled from "styled-components";
import PropTypes from "prop-types";

import Card from "components/Card";

import maskDate from "utils/maskDate";

ProjectsToAssociated.propTypes = {
  projects: PropTypes.array,
  title: PropTypes.string,
  editShowModal: PropTypes.func,
  selectedProject: PropTypes.object,
};
export default function ProjectsToAssociated({ title, projects, editShowModal, selectedProject }) {
  function toggleShowModal() {
    editShowModal((state) => !state);
  }
  return (
    <>
      <Title>{title}</Title>
      <Container>
        {projects.map((project) => (
          <Card
            key={project.id}
            onClick={() => {
              toggleShowModal(), selectedProject(project);
            }}
          >
            <div>
              <FormatData>
                Nome: <FontData>{project?.name}</FontData>
              </FormatData>
              <FormatData>
                Data de início:
                <FontData>{maskDate(project.creationDate)}</FontData>
              </FormatData>
              <FormatData>
                Data de término:
                <FontData>{maskDate(project.endDate) || "Não terminou"}</FontData>
              </FormatData>
            </div>
            <div>{!project.endDate ? "🟢" : "🔴"}</div>
          </Card>
        ))}
      </Container>
    </>
  );
}
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  padding: 3% 0;
`;
const Container = styled.div`
  width: 100%;
  overflow-y: auto;
`;
const FormatData = styled.p`
  padding: 7px;
  font-size: 1rem;
  font-weight: 700;
`;
const FontData = styled.span`
  font-weight: 400;
`;
