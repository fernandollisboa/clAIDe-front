import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import Modal from "components/Modal";
import FormDate from "components/FormDate";

import ProjectService from "services/ProjectsService";

import { alertUser } from "utils/alertUser";
//TODO maskdate
import maskDate from "utils/maskDate";

UpdateAssociationModal.propTypes = {
  projectAssociated: PropTypes.object,
  member: PropTypes.shape(),
  showModal: PropTypes.bool,
  editShowModal: PropTypes.func,
};
export default function UpdateAssociationModal({
  projectAssociated,
  member,
  showModal,
  editShowModal,
}) {
  // iniciar com os dados do projeto associado
  const [projectInfo, setProjectInfo] = useState({
    ...projectAssociated,
    startDate: "",
    endDate: "oioi",
  });
  const { startDate, endDate } = projectInfo;

  function handleStartDateInputChange(startDate) {
    setProjectInfo((state) => {
      return { ...state, startDate };
    });
  }
  function handleEndDateInputChange(endDate) {
    setProjectInfo((state) => {
      return { ...state, endDate };
    });
  }
  async function updateAssociateStudentWithProject() {
    try {
      await ProjectService.updateAssociateMemberWithProject(
        member.id,
        projectAssociated.project.id,
        maskDate(startDate),
        maskDate(endDate)
      );
      setProjectInfo({
        startDate: "",
        endDate: "",
      });
      editShowModal(false);
      alertUser({ text: "Projeto atualizado!", type: "success" });
    } catch (error) {
      setProjectInfo({
        startDate: "",
        endDate: "",
      });
      if (error.response.status === 404) {
        alertUser({
          text: `${member?.name} e ${projectAssociated?.project?.name} não encontrados`,
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

  return (
    <Modal modalOpen={showModal} width="90vh">
      <Container>
        <span>
          Tem certeza que deseja editar o aluno <strong> {member?.name} </strong> ao projeto
          <strong> {projectAssociated?.project?.name}</strong>?
        </span>
        <InputsModal>
          <FormDate
            placeholder="Data de início"
            className="date"
            onChange={handleStartDateInputChange}
            value={maskDate(startDate)}
          />

          <FormDate
            placeholder="Data de fim"
            className="date"
            onChange={handleEndDateInputChange}
            value={maskDate(endDate)}
          />

          <Button
            style={{ padding: "1%", height: "52px" }}
            onClick={() => {
              editShowModal(false);
              setProjectInfo({
                startDate: "",
                endDate: "",
              });
            }}
          >
            Cancelar
          </Button>
          <Button
            style={{ border: "2px solid red", color: "red", padding: "1%", height: "52px" }}
            onClick={() => {
              updateAssociateStudentWithProject(), editShowModal(false);
            }}
          >
            Confirmar
          </Button>
        </InputsModal>
      </Container>
    </Modal>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  strong {
    font-weight: 700;
  }
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
