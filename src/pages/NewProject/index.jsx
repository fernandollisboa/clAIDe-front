import ProjectForm from "../../components/ProjectForm";
import ProjectsService from "../../services/ProjectsService";
import Footer from "../../layouts/Footer";
import { dateIsoToDate } from "../../utils/transformDate";

export default function NewProject() {
  function handleSubmit(formData) {
    try {
      const project = {
        name: formData.name,
        creationDate: dateIsoToDate(formData.creationDate),
        endDate: dateIsoToDate(formData.endDate) ?? null,
        room: formData.room || null,
        building: formData.building || null,
        embrapii_code: formData.embrapiiCode || null,
        financier: formData.financier || null,
      };
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
