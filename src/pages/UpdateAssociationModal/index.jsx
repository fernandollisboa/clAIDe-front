import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import Modal from "components/Modal";
import FormDate from "components/FormDate";

import ProjectService from "services/ProjectsService";

import { alertUser } from "utils/alertUser";
import { transformDate } from "utils/transformDate";
import Form from "components/Form";

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
  const [projectInfo, setProjectInfo] = useState({
    startDate: projectAssociated.startDate,
    endDate: projectAssociated.endDate,
    // ...projectAssociated,
  });
  console.log(projectAssociated);
  console.log({ projectInfo });

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
        transformDate(projectInfo.startDate),
        transformDate(projectInfo.endDate)
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
  const inputs = [
    {
      inputType: "date",
      name: "Data de início",
      id: "startDate",
      placeholder: "Data de início",
      onChange: handleStartDateInputChange,
      value: startDate,
    },
    {
      inputType: "date",
      name: "Data de término",
      id: "endDate",
      onChange: handleEndDateInputChange,
      placeholder: "Data de término *",
      value: endDate,
    },
  ];

  return (
    <Modal modalOpen={showModal} width="80vh" height="50vh">
      <Form
        isFormValid={true}
        inputs={inputs}
        onSubmit={updateAssociateStudentWithProject}
        typeLabel="Editar Projeto associado"
        buttonLabel="Editar"
        isModal={true}
        height={"200px"}
      />
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
