import api from "./api";
import { createHeaders, createQueryString } from "./requestBuilders";

class MembersService {
  create(body) {
    const config = createHeaders();
    return api.post("members/", body, config);
  }
  getAll(isActive, desc = false) {
    const config = createHeaders();
    const query = createQueryString({ isActive, desc });

    return api.get(`members/${query}`, config);
  }
  getById(id) {
    const config = createHeaders();
    return api.get(`members/${id}`, config);
  }
  update(memberData) {
    const {
      id,
      name,
      email,
      birthDate,
      username,
      cpf,
      rg,
      passport,
      phone,
      memberType,
      lattes,
      hasKey,
      isBrazilian,
      lsdEmail,
      secondaryEmail,
      roomName,
    } = memberData;
    const body = {
      id,
      name,
      email,
      birthDate,
      username,
      cpf,
      rg,
      passport,
      phone,
      memberType,
      lattes,
      hasKey,
      isBrazilian,
      lsdEmail,
      secondaryEmail,
      roomName,
    };
    const config = createHeaders();
    return api.put(`members/`, body, config);
  }
}
export default new MembersService();
