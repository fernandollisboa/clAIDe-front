import { useState } from "react";

import ProjectForm from "../../components/ProjectForm";
import Layout from "../../components/Layout";

import ProjectsService from "../../services/ProjectsService";

import { alertUser } from "../../utils/alertUser";

export default function NewProject() {
  const [formSent, setFormSent] = useState(false);

  async function handleSubmit(formData) {
    try {
      const { name, creationDate, endDate, room, building, embrapiiCode, financier } = formData;
      const project = {
        name,
        creationDate,
        endDate: endDate || null,
        room,
        building,
        embrapii_code: embrapiiCode,
        financier,
      };

      await ProjectsService.create(project);
      alertUser({ text: "Formulario enviado", type: "success" });
      setFormSent(true);
    } catch (error) {
      setFormSent(false);
      alertUser({ text: error.response.data, type: "error" });
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
