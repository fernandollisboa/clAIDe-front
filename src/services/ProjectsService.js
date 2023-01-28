import api from "./api";
import { createHeaders, createQueryString } from "./requestBuilders";

class ProjectsService {
  create(body) {
    const config = createHeaders();
    return api.post("projects/", body, config);
  }
  getAll(isActive, desc = false) {
    const config = createHeaders();
    const query = createQueryString({ isActive, desc });
    return api.get(`projects/${query}`, config);
  }
  getById(id) {
    const config = createHeaders();
    return api.get(`projects/${id}`, config);
  }
  updateAssociateMemberWithProject({ memberId, projectId, startDate, endDate }) {
    const config = createHeaders();
    const body = { startDate, endDate };
    return api.put(`projects/${projectId}/members/${memberId}`, body, config);
  }
  createAssociateMemberWithProject({ memberId, projectId, startDate, endDate }) {
    const config = createHeaders();
    const body = { startDate, endDate, memberId };
    return api.post(`projects/${projectId}/members/`, body, config);
  }
  getAssociateProjectByMemberId(memberId) {
    const config = createHeaders();
    return api.get(`/members/${memberId}/projects`, config);
  }
  getActivity() {
    const config = createHeaders();
    return api.get(`activity-records/`, config);
  }
  getAssociateProjectByProjectId(projectId) {
    const config = createHeaders();
    return api.get(`projects/${projectId}/members`, config);
  }
  update(projectData) {
    const config = createHeaders();
    return api.put(`projects/`, projectData, config);
  }
}
export default new ProjectsService();
