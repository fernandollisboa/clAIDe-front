import styled from "styled-components";
import PropTypes from "prop-types";

import Card from "components/Card";

import { transformDate } from "utils/transformDate";

AssociatedProjects.propTypes = {
  projects: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  editShowModal: PropTypes.func,
  selectedProject: PropTypes.object,
};
export default function AssociatedProjects({ title, projects, editShowModal, selectedProject }) {
  function toggleShowModal() {
    editShowModal((state) => !state);
  }

  return (
    <>
      <Title>{title}</Title>
      <Container>
        {projects.map(({ project, startDate, endDate }) => (
          <Card
            key={project.id}
            onClick={() => {
              selectedProject({ startDate, endDate });
              toggleShowModal();
            }}
          >
            <div>
              <FormatData>
                Nome: <FontData>{project?.name}</FontData>
              </FormatData>
              <FormatData>
                Data de início:
                <FontData>{transformDate(startDate)}</FontData>
              </FormatData>
              <FormatData>
                Data de término:
                <FontData>{transformDate(endDate) || "Não terminou"}</FontData>
              </FormatData>
            </div>
            <div>{!endDate ? "🟢" : "🔴"}</div>
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
