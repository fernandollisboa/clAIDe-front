import api from "./api";
import { createHeaders, createQueryString } from "./requestBuilders";

class MembersService {
  create(body) {
    return api.post("members/", body);
  }
  getAll(isActive, desc = false) {
    const query = createQueryString({ isActive, desc });

    return api.get(`members/${query}`);
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
      services,
    } = memberData;
    const body = {
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
      services,
    };
    const config = createHeaders();
    return api.put(`members/${id}`, body, config);
  }
}
export default new MembersService();
