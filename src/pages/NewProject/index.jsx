import { useState } from "react";

import ProjectForm from "../../components/ProjectForm";
import Layout from "../../components/Layout";

import ProjectsService from "../../services/ProjectsService";

import { alertUser } from "../../utils/alertUser";

export default function NewProject() {
  const [formSent, setFormSent] = useState(false);

  async function handleSubmit(formData) {
    try {
      const project = {
        name: formData.name,
        creationDate: formData.creationDate,
        endDate: formData.endDate || null,
        room: formData.room,
        building: formData.building,
        embrapii_code: formData.embrapiiCode,
        financier: formData.financier,
      };

      await ProjectsService.create(project);
      alertUser({ text: "Formulario enviado", type: "success" });
      setFormSent(true);
    } catch (error) {
      setFormSent(false);
      alertUser({ text: error.response.data.message, type: "error" });
    }
  }
  return (
    <Layout>
      <ProjectForm
        typeLabel="Novo projeto"
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
        formSent={formSent}
      />
    </Layout>
  );
}
