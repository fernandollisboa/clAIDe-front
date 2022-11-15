import ProjectForm from "../../components/ProjectForm";
import ProjectsService from "../../services/ProjectsService";
import Footer from "../../layouts/Footer";

export default function NewProject() {
  function handleSubmit(formData) {
    try {
      const project = {
        name: formData.name,
        creationDate: formData.creationDate,
        endDate: formData.endDate,
        room: formData.room,
        building: formData.building,
        embrapii_code: formData.embrapiiCode,
        financier: formData.financier,
      };
      console.log(project);
      ProjectsService.create(project);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <ProjectForm typeLabel="Novo projeto" buttonLabel="Cadastrar" onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}
