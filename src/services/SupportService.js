import Api from "./api";

class SupportService {
  async postRegistrationReview({ memberId, comment, status }) {
    const body = { comment, status };
    return Api.put(`/members/set-status-registration/${memberId}`, body);
  }

  async getPendingRegistrations() {
    return Api.get("/members?registrationStatus=PENDING");
  }
}

export default new SupportService();
