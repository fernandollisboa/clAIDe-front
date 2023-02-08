import { useState } from "react";

import Layout from "../../components/Layout";
import MemberForm from "../../components/MemberForm";
import MembersService from "../../services/MembersService";
import { alertUser } from "../../utils/alertUser";
import { useNavigate } from "react-router-dom";

export default function NewMember() {
  const [formSent, setFormSent] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const { emailLsd, secondEmail } = formData;

    try {
      delete formData.emailLsd;
      delete formData.secondEmail;
      const member = {
        ...formData,
        secondaryEmail: secondEmail || "",
        lsdEmail: emailLsd || "",
      };

      await MembersService.create(member);

      alertUser({ text: "Formulário enviado", type: "success" });
      setFormSent(true);
      navigate(-1);
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
  return (
    <Layout>
      <MemberForm
        onSubmit={handleSubmit}
        typeLabel="Novo membro"
        buttonLabel="Cadastrar"
        formSent={formSent}
        incomingErrors={errors}
      />
    </Layout>
  );
}
