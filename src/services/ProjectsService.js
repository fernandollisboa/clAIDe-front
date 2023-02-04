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
  getActivity(desc, entity, operation) {
    const config = createHeaders();
    let params = new URLSearchParams();
    params.append("operation", operation);
    params.append("desc", desc);
    params.append("entity", entity);
    let queryString = params.toString();
    return api.get(`activity-records/?${queryString}`, config);
  }
  getAssociateProjectByProjectId(projectId) {
    const config = createHeaders();
    return api.get(`projects/${projectId}/members`, config);
  }
  update(projectId, projectData) {
    const config = createHeaders();
    return api.put(`projects/${projectId}`, projectData, config);
  }
}
export default new ProjectsService();
