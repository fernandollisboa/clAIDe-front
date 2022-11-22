import api from "./api";

class MembersService {
  create(body) {
    return api.post("members/", body);
  }
  getAll() {
    return api.get(`members/`);
  }
}
export default new MembersService();
