import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProjectForm from "../../components/ProjectForm";
import Layout from "../../components/Layout";
import ProjectsService from "../../services/ProjectsService";
import { alertUser } from "../../utils/alertUser";

export default function NewProject() {
  const [formSent, setFormSent] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      await ProjectsService.create(formData);
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
      <ProjectForm
        typeLabel="Novo projeto"
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
        formSent={formSent}
        incomingErrors={errors}
      />
    </Layout>
  );
}
