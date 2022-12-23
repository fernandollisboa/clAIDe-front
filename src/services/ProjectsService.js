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
    console.log({ query, config });
    return api.get(`projects/${query}`, config);
  }
  getById(id) {
    const config = createHeaders();
    return api.get(`projects/${id}`, config);
  }
  updateAssociateMemberWithProject(memberId, projectId, startDate, endDate) {
    const config = createHeaders();
    const body = { startDate, endDate };
    return api.put(`projects/${projectId}/members/${memberId}`, body, config);
  }
  getAssociateProjectByMemberId(memberId) {
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
