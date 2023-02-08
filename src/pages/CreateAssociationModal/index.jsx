import { object, bool, func } from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "components/Modal";
import MemberAssociationForm from "components/MemberAssociationForm";
import ProjectService from "services/ProjectsService";

import { alertUnmappedError, alertUser } from "utils/alertUser";

CreateAssociationModal.propTypes = {
  project: object.isRequired,
  member: object.isRequired,
  showModal: bool.isRequired,
  setShowModal: func.isRequired,
  initialState: object,
};
CreateAssociationModal.defaultProps = {
  initialState: {},
};
export default function CreateAssociationModal({
  project: projectAssociation,
  member,
  showModal,
  setShowModal,
}) {
  const [formSent, setFormSent] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(formData) {
    const { startDate, endDate } = formData;

    const { id: memberId } = member;
    const { projectId } = projectAssociation;

    try {
      await ProjectService.createAssociateMemberWithProject({
        memberId,
        projectId,
        startDate,
        endDate,
      });
      setShowModal(false);
      setFormSent(true);
      navigate(-1);
      alertUser({ text: "Projeto atualizado!", type: "success" });
    } catch (err) {
      const { status } = err.response;
      setFormSent(false);

      if (status === 422) {
        alertUser({
          text: `Data de inicio não pode ser antes do projeto iniciar e data de fim não pode ser depois do projeto terminar `,
          type: "error",
        });
      } else alertUnmappedError(err);
    }
  }

  return (
    <Modal modalOpen={showModal} width="40vw">
      <MemberAssociationForm
        onSubmit={onSubmit}
        typeLabel="Criar Associação em Projeto"
        formSent={formSent}
        onReturnNavigate={() => setShowModal((s) => !s)}
      />
    </Modal>
  );
}
