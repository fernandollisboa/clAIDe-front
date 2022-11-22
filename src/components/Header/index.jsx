import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/foto_lsd.svg";
import profile from "../../assets/profile.svg";

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="logo lsd" />
      <NavBar>
        <Link to="/member">Membros</Link>
        <Link to="/teacher">Professores</Link>
        <Link to="/projects">Projetos</Link>
      </NavBar>
      <img src={profile} alt="account" />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 68%;
  margin: 1% auto;
  justify-content: space-between;
  background: #fff;
  border: none;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  padding: 0 1%;
`;
const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  width: 30%;
  align-items: center;
  justify-content: space-between;
  a {
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    font-style: bold;
    text-decoration: none;
    color: #131313;
  }
`;
