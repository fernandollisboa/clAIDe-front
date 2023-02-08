import styled from "styled-components";
import PropTypes from "prop-types";

import Card from "components/Card";

import maskDate from "utils/maskDate";

AssociatedProjects.propTypes = {
  projects: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  editShowModal: PropTypes.func,
  setProjectAssociation: PropTypes.func,
};
export default function AssociatedProjects({
  title,
  projects,
  editShowModal,
  setProjectAssociation,
}) {
  function toggleShowModal() {
    editShowModal((state) => !state);
  }

  return (
    <>
      <Title>{title}</Title>
      <Container>
        {projects.map(({ project, startDate, endDate, isActive }) => (
          <Card
            key={project.id}
            onClick={() => {
              setProjectAssociation({ startDate, endDate, projectId: project.id });
              toggleShowModal();
            }}
          >
            <div>
              <FormatData>
                Nome: <FontData>{project?.name}</FontData>
              </FormatData>
              <FormatData>
                Data de início:
                <FontData>{maskDate(startDate)}</FontData>
              </FormatData>
              <FormatData>
                Data de término:
                <FontData>{maskDate(endDate) || "Não terminou"}</FontData>
              </FormatData>
            </div>
            <div>{isActive ? "🟢" : "🔴"}</div>
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
  height: 45vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormatData = styled.p`
  padding: 7px;
  font-size: 1rem;
  font-weight: 700;
`;
const FontData = styled.span`
  font-weight: 400;
`;
