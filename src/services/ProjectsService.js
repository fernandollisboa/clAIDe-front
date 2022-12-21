import api from "./api";

class ProjectsService {
  create(body) {
    return api.post("projects/", body);
  }
  getAll(isActive, desc) {
    return api.get(`projects/?isActive=${isActive}&desc=${desc}`);
  }
  async getById(id) {
    return await api.get(`projects/${id}`);
  }
  associateMemberWithProject(memberId, projectId, startDate, endDate) {
    const body = { startDate, endDate };
    return api.post(`projects/${projectId}/members/${memberId}`, body);
  }
  getAssociateProjectByMemberId(memberId) {
    return api.get(`projects/members/${memberId}`);
  }
  getAssociateProjectByProjectId(projectId) {
    return api.get(`projects/${projectId}/members`);
  }
}
export default new ProjectsService();
