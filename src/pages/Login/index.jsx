import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOff, IoEyeSharp, IoPerson } from "react-icons/io5";

import LogoLsd from "../../assets/logo_lsd_cor.png";
import Footer from "../../layouts/Footer";
import LoginService from "../../services/LoginService";
import { alertUser } from "../../utils/alertUser";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("claideToken");
        if (accessToken) {
          localStorage.setItem("claideToken", accessToken);
          alertUser({ text: "Bem-vindo(a)!", type: "success" });
          navigate("/members");
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  async function sendData(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await LoginService.post({ username, password });
      if (localStorage.getItem("claideToken")) {
        localStorage.removeItem("claideToken");
      }
      localStorage.setItem("claideToken", response.data.token);
      alertUser({ text: "Bem-vindo(a)!", type: "success" });
      navigate("/members");
    } catch (err) {
      const { status } = err.response;

      if (status === 404) alertUser({ text: "Usuário não encontrado" });
      else if (status === 401 || status === 403) alertUser({ text: "Credenciais inválidas" });
      else alertUser({ text: "Erro não mapeado" });
    }
    setIsLoading(false);
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
  }

  return (
    <PageWrapper>
      <PageGrid>
        <LoginSection>
          <LoginFormWrapper>
            <LoginForm onSubmit={sendData}>
              <TitleAndSubtitleWrapper>
                <Title>Bem vindo(a)!</Title>
                <Subtitle>Preencha os dados do login para acessar</Subtitle>
              </TitleAndSubtitleWrapper>
              <MainContent>
                <LabelAndInputWrapper>
                  <LabelWrapper>
                    <label htmlFor="username">Usuário</label>
                  </LabelWrapper>
                  <InputWrapper disabled={isLoading}>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      id="username"
                      placeholder="nome.usuario"
                    />
                    <Icon>
                      <IoPerson />
                    </Icon>
                  </InputWrapper>
                </LabelAndInputWrapper>
                <LabelAndInputWrapper>
                  <LabelWrapper>
                    <label htmlFor="password">Senha</label>
                  </LabelWrapper>
                  <InputWrapper disabled={isLoading}>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="senha"
                      autoComplete="current-password"
                    />
                    <Icon onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? <IoEyeSharp /> : <IoEyeOff />}
                    </Icon>
                  </InputWrapper>
                </LabelAndInputWrapper>
                <ButtonLogin type="submit" disabled={isLoading}>
                  {"ENTRAR"}
                </ButtonLogin>
              </MainContent>
            </LoginForm>
          </LoginFormWrapper>
        </LoginSection>
        <LogoSection>
          <LogoWrapper>
            <img src={LogoLsd} width="100%" alt="LSD Logo" />
          </LogoWrapper>
        </LogoSection>
        <Footer gridColumnStart="1" gridColumnEnd="3" />
      </PageGrid>
    </PageWrapper>
  );
}

const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 9fr 1fr;
  grid-template-areas: "l l" "f f";
  height: 100%;
`;

const LoginSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: 5%;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 5%;
`;

const LogoWrapper = styled.div`
  background-color: #486fbd;
  border-radius: 5%;
  width: 70%;
  align-items: center;
`;

const LoginFormWrapper = styled.section`
  min-width: 66%;
  min-height: 70%;
  padding: 5% 0;
  border-radius: 2%;
  background-color: #f5f5f5;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const LoginForm = styled.form`
  height: 100%;
`;

const TitleAndSubtitleWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-style: italic;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 500;
  font-size: 3rem;
  padding-top: 2%;
  padding-bottom: 8%;
`;

const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 1.4rem;
  padding-bottom: 2%;
`;

const MainContent = styled.main`
  padding: 6% 0;
  text-align: center;
`;

const LabelAndInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;
`;

const LabelWrapper = styled.div`
  width: 60%;
  text-align: start;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.823);
  label {
    font-size: 1.6rem;
  }
`;

const InputWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.44);
  height: 3rem;
  width: 60%;
  text-align: start;
  display: flex;
  flex-wrap: nowrap;

  background: ${({ disabled }) => (disabled ? "#9292b855" : "")};
  border-radius: 5%;

  input {
    width: 90%;
    font-size: 1.5rem;
    border: 0;
    outline: 0;
    background-color: transparent;
  }
`;

const Icon = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  font-size: 5rem;
  cursor: pointer;
`;

const ButtonLogin = styled.button`
  cursor: pointer;
  height: 4.5rem;
  width: 80%;
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  color: #ffffff;

  background: ${({ disabled }) => (disabled ? "#c8cdd8" : "#486fbd")};
  border-radius: 5%;
  border: none;
`;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;

  @media screen and (max-width: 1200px) {
    width: 100vw;
    max-width: 100vw;
  }
  @media screen and (max-width: 800px) {
    justify-content: center;
    padding-top: 0px;
  }
`;
