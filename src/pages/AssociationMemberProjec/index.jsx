import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import Modal from "components/Modal";
import FormDate from "components/FormDate";
import Card from "components/Card";
import { transformDate } from "utils/transformDate";
import FormGroup from "components/FormGroup";

import ProjectsService from "services/ProjectsService";
import { alertUser } from "utils/alertUser";

AssociationMemberProject.propTypes = {
  projects: PropTypes.array.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  member: PropTypes.node.isRequired,
};
export default function AssociationMemberProject({ projects, showModal, setShowModal, member }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProject, setSelectedProject] = useState({});
  const [isSelected, setIsSelected] = useState(0);

  function handleCloseModal() {
    setEndDate("");
    setStartDate("");
    setIsSelected(0);
    setShowModal();
  }
  async function AssociateStudentWithProject() {
    try {
      await ProjectsService.createAssociateMemberWithProject(
        member.id,
        selectedProject.id,
        transformDate(startDate),
        transformDate(endDate)
      );
      setStartDate(null);
      setEndDate(null);
      handleCloseModal();
      setIsSelected(0);
      alertUser({ text: "Projeto associado!", type: "success" });
    } catch (error) {
      if (error.response.status === 409) {
        alertUser({
          text: `${member.name} e ${selectedProject.name} já estão associados`,
          type: "error",
        });
      }
      if (error.response.status === 404) {
        alertUser({
          text: `${member.name} e ${selectedProject.name} não encontrados`,
          type: "error",
        });
      }
      if (error.response.status === 422) {
        alertUser({
          text: `Data de inicio não pode ser antes do projeto iniciar e data de fim não pode ser depois do projeto terminar `,
          type: "error",
        });
      }
    }
  }
  function checkIsSelected(id) {
    if (isSelected === id) {
      return true;
    } else return false;
  }
  return (
    <Modal modalOpen={showModal} height={"50vh"}>
      <Container>
        {projects.map((project) => (
          <Card
            selected={checkIsSelected(project.id)}
            key={project.id}
            style={{
              width: "250px",
            }}
            onClick={() => {
              setSelectedProject(project);
              setIsSelected(project.id);
            }}
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
      <InputsModal>
        <FormGroup>
          <FormDate
            placeholder="Data de início"
            className="date"
            onChange={setStartDate}
            value={transformDate(startDate)}
          />
        </FormGroup>

        <FormDate
          placeholder="Data de fim"
          className="date"
          onChange={setEndDate}
          value={transformDate(endDate)}
        />

        <Button style={{ padding: "1%", height: "52px" }} onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button
          style={{ border: "2px solid red", color: "red", padding: "1%", height: "52px" }}
          onClick={AssociateStudentWithProject}
        >
          Confirmar
        </Button>
      </InputsModal>
    </Modal>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 2vh;
  overflow: auto;
  margin-bottom: 50px;
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

const InputsModal = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  .date {
    border: 2px solid black;
    outline: 0;
    padding: 0 5%;
    font-size: 1rem;
    height: 52px;
  }
`;

const Button = styled.button`
  border: 2px solid #131313;
  text-decoration: none;
  border-radius: 4px;
  padding: 4%;
  background: #fff;
  font-weight: 700;
  font-size: 1rem;
  margin-right: 5%;
  cursor: pointer;
`;
