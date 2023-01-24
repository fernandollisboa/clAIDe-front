import { useState } from "react";
import { bool, func } from "prop-types";
import ProjectsService from "services/ProjectsService";

import { alertUser } from "../../utils/alertUser";
import Modal from "components/Modal";
import ProjectForm from "components/ProjectForm";

EditProject.propTypes = {
  showModal: bool,
  setShowModal: func,
};
EditProject.defaultProps = {
  showModal: false,
};
export default function EditProject({ showModal, setShowModal, initialState, projectId }) {
  const [formSent, setFormSent] = useState(false);

  async function handleSubmit(formData) {
    try {
      const { room, building, endDate, embrapiiCode } = formData;
      delete formData.embrapiiCode;
      const project = {
        id: projectId,
        room: room,
        building: building,
        endDate: endDate,
        embrapii_code: embrapiiCode,
        ...formData,
      };

      await ProjectsService.update(project);

      alertUser({ text: "Formulario enviado", type: "success" });
      setFormSent(true);
    } catch (error) {
      setFormSent(false);
      alertUser({ text: error.response.data.message, type: "error" });
    }
  }

  function toggleShowModal() {
    setShowModal((state) => !state);
  }

  return (
    <Modal modalOpen={showModal} height="90%" width="60%">
      <ProjectForm
        onSubmit={handleSubmit}
        typeLabel="Editar Projeto"
        buttonLabel="Enviar"
        formSent={formSent}
        isModal={true}
        onReturnNavigate={toggleShowModal}
        initialState={initialState}
        maxWidth="90%"
      />
    </Modal>
  );
}
