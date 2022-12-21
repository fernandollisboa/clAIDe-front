import Api from "./api";

class LoginService {
  async post({ username, password }) {
    const body = { username, password };
    return await Api.post("/login", body);
  }
}

export default new LoginService();
