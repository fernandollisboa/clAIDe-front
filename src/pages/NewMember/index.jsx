import { useState } from "react";

import Layout from "../../components/Layout";
import MemberForm from "../../components/MemberForm";

import MembersService from "../../services/MembersService";
import { alertUser } from "../../utils/alertUser";

export default function NewMember() {
  const [formSent, setFormSent] = useState(false);

  async function handleSubmit(formData) {
    const { emailLsd: lsdEmail, secondEmail: secondaryEmail, room: roomName } = formData;

    try {
      delete formData.emailLsd;
      delete formData.secondEmail;
      delete formData.room;
      const member = { ...formData, lsdEmail, secondaryEmail, roomName };

      await MembersService.create(member);

      alertUser({ text: "Formulario enviado", type: "success" });
      setFormSent(true);
    } catch (error) {
      alertUser({ text: error.response.data.message, type: "error" });
      setFormSent(false);
    }
  }
  return (
    <Layout>
      <MemberForm
        onSubmit={handleSubmit}
        typeLabel="Novo membro"
        buttonLabel="Cadastrar"
        formSent={formSent}
      />
    </Layout>
  );
}
