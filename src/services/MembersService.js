import api from "./api";

class MembersService {
  create(body) {
    return api.post("members/", body);
  }
  getAll(isActive, desc) {
    return api.get(`members/?isActive=${isActive}&desc=${desc}`);
  }
  getById(id) {
    return api.get(`members/${id}`);
  }
}
export default new MembersService();
