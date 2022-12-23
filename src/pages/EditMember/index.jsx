import { useState } from "react";
import { bool, func } from "prop-types";

import MemberForm from "../../components/MemberForm";
import MembersService from "../../services/MembersService";
import { alertUser } from "../../utils/alertUser";
import Modal from "components/Modal";

EditMember.propTypes = {
  showModal: bool,
  setShowModal: func,
};
EditMember.defaultProps = {
  showModal: false,
};
export default function EditMember({ showModal, setShowModal, initialState }) {
  const [formSent, setFormSent] = useState(false);

  async function handleSubmit(formData) {
    const { emailLsd: lsdEmail, secondEmail: secondaryEmail, room: roomName } = formData;

    try {
      const member = { ...formData, lsdEmail, secondaryEmail, roomName };

      await MembersService.update(member);

      alertUser({ text: "Formulario enviado", type: "success" });
      setFormSent(true);
    } catch (error) {
      const { status } = error.response;
      alertUser({ text: status });
      setFormSent(false);
    }
  }
  function toggleShowModal() {
    setShowModal((state) => !state);
  }
  return (
    <Modal modalOpen={showModal} height="96%" width="80%">
      <MemberForm
        onSubmit={handleSubmit}
        typeLabel="Editar Membro"
        buttonLabel="Editar"
        formSent={formSent}
        isModal={true}
        onReturnNavigate={toggleShowModal}
        initialState={initialState}
        maxWidth="90%"
      />
    </Modal>
  );
}
