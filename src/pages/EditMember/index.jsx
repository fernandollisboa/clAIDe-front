import { useState } from "react";
import { bool, func } from "prop-types";

import MemberForm from "../../components/MemberForm";
import MembersService from "../../services/MembersService";
import { alertUser } from "../../utils/alertUser";
import Modal from "components/Modal";
import maskDate from "utils/maskDate";

EditMember.propTypes = {
  showModal: bool,
  setShowModal: func,
};
EditMember.defaultProps = {
  showModal: false,
};
export default function EditMember({ showModal, setShowModal, initialState }) {
  const [formSent, setFormSent] = useState(false);
  const [errors, setErrors] = useState(null);

  async function handleSubmit(formData) {
    try {
      const member = { ...formData };
      await MembersService.update(member);

      alertUser({ text: "Formulario enviado", type: "success" });
      setFormSent(true);
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
      <MemberForm
        onSubmit={handleSubmit}
        typeLabel="Editar Membro"
        buttonLabel="Enviar"
        formSent={formSent}
        isModal={true}
        onReturnNavigate={toggleShowModal}
        initialState={initialState}
        maxWidth="90%"
        incomingErrors={errors}
      />
    </Modal>
  );
}
