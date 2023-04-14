import Api from "./api";

class LoginService {
  async post({ username, password }) {
    const body = { username, password };
    return Api.post("/login", body);
  }
}

export default new LoginService();
