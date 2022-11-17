import ProjectForm from "../../components/ProjectForm";
import ProjectsService from "../../services/ProjectsService";
import Header from "../../components/Header";

export default function NewProject() {
  function handleSubmit(formData) {
    try {
      const project = {
        name: formData.name,
        creationDate: formData.creationDate,
        endDate: formData.endDate || null,
        room: formData.room || null,
        building: formData.building || null,
        embrapii_code: formData.embrapiiCode || null,
        financier: formData.financier || null,
      };

      ProjectsService.create(project);
      alert("Formulario enviado");
    } catch (err) {
      alert("Ocorreu um erro ao enviar o formulario");

      console.log(err);
    }
  }
  return (
    <>
      <Header />
      <ProjectForm typeLabel="Novo projeto" buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
