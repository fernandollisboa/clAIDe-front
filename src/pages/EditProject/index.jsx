import { useState } from "react";
import { bool, func, object, number } from "prop-types";
import ProjectsService from "services/ProjectsService";

import { alertUser } from "../../utils/alertUser";
import Modal from "components/Modal";
import ProjectForm from "components/ProjectForm";
import maskDate from "utils/maskDate";

EditProject.propTypes = {
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
  initialState: object.isRequired,
  projectId: number.isRequired,
};
export default function EditProject({ showModal, setShowModal, initialState, projectId }) {
  const [formSent, setFormSent] = useState(false);
  const [errors, setErrors] = useState(null);

  async function handleSubmit(formData) {
    try {
      const project = {
        ...formData,
      };

      await ProjectsService.update(projectId, project);

      alertUser({ text: "Formulário enviado", type: "success" });
      setFormSent(true);
      setErrors();
      setShowModal(false);
    } catch (error) {
      const { status } = error.response;

      if (status === 422) {
        alertUser({ text: "Verifique os campos em destaque", type: "error" });
        const { errorLabels } = error.response.data;
        setErrors([...errorLabels]);
      } else if (status === 409) {
        const { errorLabels } = error.response.data;
        alertUser({
          text: `${errorLabels[0]} já cadastrado, por favor insira um diferente`,
          type: "error",
        });
        setErrors([...errorLabels]);
      } else {
        alertUser({ text: "Erro não mapeado, favor contactar a equipe", type: "error" });
      }
      setFormSent(false);
    }
  }

  function toggleShowModal() {
    setShowModal((state) => !state);
  }

  return (
    <Modal modalOpen={showModal} height="75vh">
      <ProjectForm
        onSubmit={handleSubmit}
        typeLabel="Editar Projeto"
        buttonLabel="Enviar"
        formSent={formSent}
        onReturnNavigate={toggleShowModal}
        isEditingActiveProject={true}
        initialState={{
          ...initialState,
          creationDate: maskDate(initialState?.creationDate),
          endDate: maskDate(initialState?.endDate),
        }}
        maxWidth="90%"
        incomingErrors={errors}
      />
    </Modal>
  );
}
