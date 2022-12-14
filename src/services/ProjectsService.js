import api from "./api";

class ProjectsService {
  create(body) {
    return api.post("projects/", body);
  }
  getAll(isActive, desc) {
    return api.get(`projects/?isActive=${isActive}&desc=${desc}`);
  }
  associateMemberWithProject(memberId, projectId, startDate, endDate) {
    const body = { startDate, endDate };
    return api.post(`projects/${projectId}/members/${memberId}`, body);
  }
  getAssociateProjectMemberId(memberId) {
    return api.get(`projects/members/${memberId}`);
  }
}
export default new ProjectsService();
