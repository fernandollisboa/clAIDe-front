import api from "./api";

class MembersService {
  create(body) {
    return api.post("members/", body);
  }
  getAll(isActive, desc) {
    return api.get(`members/?isActive=${isActive}&desc=${desc}`);
  }
}
export default new MembersService();
