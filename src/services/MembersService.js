import api from "./api";

function createHeaders() {
  const token = window.localStorage.getItem("claideToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config;
}

class MembersService {
  create(body) {
    const config = createHeaders();
    return api.post("members/", body, config);
  }
  getAll(isActive, desc) {
    const config = createHeaders();
    return api.get(`members/?isActive=${isActive}&desc=${desc}`, config);
  }
  getById(id) {
    const config = createHeaders();
    return api.get(`members/${id}`, config);
  }
}
export default new MembersService();
