import api from "./api";

class ProjectsService {
  create(body) {
    return api.post("/projects/", body);
  }
  getAll() {
    return api.get(`projects/`);
  }
}
export default new ProjectsService();
