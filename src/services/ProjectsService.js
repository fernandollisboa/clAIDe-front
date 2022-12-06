import api from "./api";

class ProjectsService {
  create(body) {
    return api.post("projects/", body);
  }
  getAll(isActive, desc) {
    return api.get(`projects/?isActive=${isActive}&desc=${desc}`);
  }
}
export default new ProjectsService();
