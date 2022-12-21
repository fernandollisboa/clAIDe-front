import api from "./api";

function createHeaders() {
  const token = window.localStorage.getItem("claideToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config;
}
class ProjectsService {
  create(body) {
    const config = createHeaders();
    return api.post("projects/", body, config);
  }
  getAll(isActive, desc) {
    const config = createHeaders();
    return api.get(`projects/?isActive=${isActive}&desc=${desc}`, config);
  }
  async getById(id) {
    const config = createHeaders();
    return await api.get(`projects/${id}`, config);
  }
  associateMemberWithProject(memberId, projectId, startDate, endDate) {
    const config = createHeaders();
    const body = { startDate, endDate };
    return api.post(`projects/${projectId}/members/${memberId}`, body, config);
  }
  getAssociateProjectMemberId(memberId) {
    const config = createHeaders();
    return api.get(`projects/members/${memberId}`, config);
  }
  getActivity() {
    const config = createHeaders();
    return api.get(`activityRecords/`, config);
  }
  getAssociateProjectByProjectId(projectId) {
    const config = createHeaders();
    return api.get(`projects/${projectId}/members`, config);
  }
}
export default new ProjectsService();
