/* eslint-disable no-undef */

const memberData = {
  name: "Fulano de Tal",
  email: "fulano.tal@ccc.ufcg.edu.br",
  birthDate: "10/11/1987",
  username: "fulano.tal",
  cpf: "12345678931",
  rg: "9876543",
  passport: "AP1234567",
  phone: "12345678912",
  lsdEmail: "fulano.tal@lsd.ufcg.edu.br",
  secondaryEmail: "string",
  memberType: "ADMIN",
  lattes: "https://lattes.cnpq.br/FulanoDeTal",
  roomName: "Triunfo",
  hasKey: true,
  isActive: false,
  isBrazilian: true,
};

const keys = [
  "name",
  "email",
  "birthDate",
  "username",
  "cpf",
  "rg",
  "passport",
  "phone",
  "lsdEmail",
  "secondaryEmail",
  "memberType",
  "lattes",
  "roomName",
];

describe("create member", () => {
  it("should be able to edit product with valid data", () => {
    cy.visit("/");
    cy.get(`input[id = username]`).type("fernando");
    cy.get("input[id = password]").type("fernando");
    cy.get("button[type = submit]").click();
    cy.visit("/newMember");

    cy.FillForm(memberData, keys);
    cy.get("button[type = submit]").click();
  });
});
