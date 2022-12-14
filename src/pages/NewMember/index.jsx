import { useState } from "react";

import Layout from "../../components/Layout";
import MemberForm from "../../components/MemberForm";

import MembersService from "../../services/MembersService";
import { alertUser } from "../../utils/alertUser";

export default function NewMember() {
  const [formSent, setFormSent] = useState(false);

  async function handleSubmit(formData) {
    try {
      const member = {
        name: formData.name,
        birthDate: formData.birthDate,
        username: formData.username,
        cpf: formData.cpf,
        rg: formData.rg,
        passport: formData.passport,
        phone: formData.phone,
        lsdEmail: formData.emailLsd,
        email: formData.email,
        secondaryEmail: formData.secondEmail,
        memberType: formData.memberType,
        lattes: formData.lattes,
        roomName: formData.room,
        isBrazilian: formData.isBrazilian,
        hasKey: formData.hasKey,
      };

      await MembersService.create(member);

      alertUser({ text: "Formulario enviado", type: "success" });
      setFormSent(true);
    } catch (error) {
      alertUser({ text: error.response.data, type: "error" });
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
