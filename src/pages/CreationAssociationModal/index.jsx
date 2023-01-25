import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import Modal from "components/Modal";
import FormDate from "components/FormDate";

import ProjectsService from "services/ProjectsService";

//TODO maskdate ver se esse maskdate funciona mermo
import maskDate from "utils/maskDate";
import { alertUser } from "utils/alertUser";

CreationAssociationModal.propTypes = {
  project: PropTypes.shape().isRequired,
  member: PropTypes.shape().isRequired,
  showModal: PropTypes.bool.isRequired,
  editShowModal: PropTypes.func.isRequired,
};
export default function CreationAssociationModal({ project, member, showModal, editShowModal }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function AssociateStudentWithProject() {
    try {
      await ProjectsService.createAssociateMemberWithProject(
        member?.id,
        project?.id,
        startDate,
        endDate
      );
      setStartDate("");
      setEndDate("");
      alertUser({ text: "Projeto associado!", type: "success" });
    } catch (error) {
      if (error.response.status === 409) {
        alertUser({
          text: `${member?.name} e ${project?.name} já estão associados`,
          type: "error",
        });
      }
      if (error.response.status === 404) {
        alertUser({
          text: `${member?.name} e ${project?.name} não encontrados`,
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
          Tem certeza que deseja associar o aluno <strong> {member?.name} </strong> ao projeto
          <strong> {project?.name}</strong>?
        </span>
        <InputsModal>
          <FormDate
            placeholder="Data de início"
            className="date"
            onChange={setStartDate}
            value={maskDate(startDate)}
          />

          <FormDate
            placeholder="Data de fim"
            className="date"
            onChange={setEndDate}
            value={maskDate(endDate)}
          />

          <Button
            style={{ padding: "1%", height: "52px" }}
            onClick={() => {
              editShowModal(false);
              setStartDate("");
              setEndDate("");
            }}
          >
            Cancelar
          </Button>
          <Button
            style={{ border: "2px solid red", color: "red", padding: "1%", height: "52px" }}
            onClick={() => {
              AssociateStudentWithProject(), editShowModal(false);
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
