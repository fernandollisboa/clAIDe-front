import styled from "styled-components";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendData(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log({ username, password });
  }

  return (
    <PageWrapper>
      <LoginForm onSubmit={sendData}>
        <HeaderLoginForm>
          <H1LoginForm>Bem vindo(a)!</H1LoginForm>
          <H2LoginForm>Preencha os dados do login para acessar</H2LoginForm>
        </HeaderLoginForm>
        <MainLoginForm>
          <InputLoginForm>
            <LabelLoginForm htmlFor="username">Usuário</LabelLoginForm>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="jhonasrodrigues"
            />
          </InputLoginForm>
          <InputLoginForm>
            <label htmlFor="password">Usuário</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Senha"
            />
          </InputLoginForm>
        </MainLoginForm>
        <ButtonLoginForm type="submit" disabled={isLoading}>
          {"Entrar"}
        </ButtonLoginForm>
      </LoginForm>
    </PageWrapper>
  );
}

const H1LoginForm = styled.h1`
  color: rgba(0, 0, 0, 0.65);
  font-family: "PoetsenOne"; // TODO ver essa fonte
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
`;

const H2LoginForm = styled.h2`
  font-weight: 400;
  font-size: 16px;
`;

const LabelLoginForm = styled.label``;

const MainLoginForm = styled.main``;

const LoginForm = styled.form`
  background-color: #ffffff;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  width: 518px;
  height: 612px;
  left: 256px;
  top: 169px;
`;

const HeaderLoginForm = styled.div``;

const InputLoginForm = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const ButtonLoginForm = styled.button`
  padding: 10px;
  gap: 8px;

  width: 430px;
  height: 57px;
  left: 300px;
  top: 677px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 26px;
  /* identical to box height, or 108% */

  letter-spacing: 0.46px;
  text-transform: uppercase;

  /* Branco/Default */

  color: #ffffff;

  background: #486fbd;
  border-radius: 5px;
`;

const PageWrapper = styled.div`
  width: 100%;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  padding-top: 200px;
  padding-bottom: 100px;
  padding-right: 15px;
  padding-left: 15px;
  /* background-color: #f5f5f5; */
  background-color: green;

  @media screen and (max-width: 1200px) {
    width: 100vw;
    padding-top: 150px;
    padding-bottom: 50px;
  }
  @media screen and (max-width: 800px) {
    padding-top: 0;
    justify-content: center;
    padding-top: 0px;
  }
`;
