import api from "./api";
import { createHeaders } from "./requestBuilders";

class MembersService {
  getAll() {
    const config = createHeaders();

    return api.get(`services/`, config);
  }
  getAssociationByMemberId(memberId) {
    const config = createHeaders();

    return api.get(`services/${memberId}/services`, config);
  }
  createServiceAssociation(memberId, serviceId) {
    const config = createHeaders();
    const body = { memberId: memberId };
    return api.post(`services/${serviceId}/members`, body, config);
  }
}
export default new MembersService();
