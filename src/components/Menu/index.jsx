import styled from "styled-components";
import { Link } from "react-router-dom";

import Header from "../Header";

export default function Project() {
  return (
    <>
      <Header />
      <Container>
        <h1>Projetos cadastrados</h1>
        <InputSearch placeholder="Pesquisar Projeto..." type="text" />
        <div className="buttons">
          <Link to="/newProject">Cadastrar Projeto </Link>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
  margin: 0 auto;
  h1 {
    font-size: 36px;
    font-weight: 600;
  }
  .buttons {
    a {
      text-decoration: none;
      border: 2px solid #131313;
      border-radius: 4px;
      padding: 12px 30px;
      color: #131313;
      font-weight: 700;
      font-size: 16px;s
    }
  }
`;
const InputSearch = styled.input`
  width: 414px;
  background: #fff;
  border: 2px solid #fff;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  justify-content: center;
  padding: 0 16px;
`;
