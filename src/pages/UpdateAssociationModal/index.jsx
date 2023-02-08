import { object, bool, func } from "prop-types";
import { useState } from "react";

import Modal from "components/Modal";
import MemberAssociationForm from "components/MemberAssociationForm";
import ProjectService from "services/ProjectsService";
import { alertUnmappedError, alertUser } from "utils/alertUser";
import maskDate from "utils/maskDate";
import { useNavigate } from "react-router-dom";

UpdateAssociationModal.propTypes = {
  project: object.isRequired,
  member: object.isRequired,
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
  initialState: object,
};
UpdateAssociationModal.defaultProps = {
  initialState: {},
};
export default function UpdateAssociationModal({
  project,
  member,
  showModal,
  setShowModal,
  initialState,
}) {
  const [formSent, setFormSent] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(formData) {
    const { startDate, endDate } = formData;

    const { id: memberId } = member;
    const { projectId } = project;

    try {
      await ProjectService.updateAssociateMemberWithProject({
        memberId,
        projectId,
        startDate,
        endDate,
      });
      setShowModal(false);
      setFormSent(true);
      navigate(-1);
      alertUser({ text: "Projeto atualizado!", type: "success" });
    } catch (error) {
      const { status } = error.response;

      if (status === 404) {
        alertUser({
          text: `${member?.name} e/ou ${project?.name} não encontrados`,
          type: "error",
        });
      } else if (status === 422) {
        alertUser({
          text: `Data de inicio não pode ser antes do projeto iniciar e data de fim não pode ser depois do projeto terminar `,
          type: "error",
        });
      } else alertUnmappedError(error);
      setFormSent(false);
    }
  }

  return (
    <Modal modalOpen={showModal} width="40vw">
      <MemberAssociationForm
        onSubmit={onSubmit}
        typeLabel="Editar Associação em Projeto"
        formSent={formSent}
        onReturnNavigate={() => setShowModal((s) => !s)}
        initialState={{
          startDate: maskDate(initialState?.startDate),
          endDate: maskDate(initialState?.endDate),
        }}
      />
    </Modal>
  );
}
