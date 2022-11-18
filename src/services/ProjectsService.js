import api from "./api";

class ProjectsService {
  async create(body) {
    return await api.post("/projects/", body);
  }
}
export default new ProjectsService();
