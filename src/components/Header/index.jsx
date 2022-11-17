import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/foto_lsd.svg";
import profile from "../../assets/profile.svg";

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="logo lsd" />
      <NavBar>
        <Link to="/project">Membros</Link>
        <Link to="/teacher">Professores</Link>
        <Link to="/project">Projetos</Link>
      </NavBar>
      <img src={profile} alt="account" />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 1300px;
  height: 116px;
  margin: 40px auto;
  justify-content: space-between;
  background: #fff;
  border: none;
  border: 2px solid #fff;
  height: 116px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  padding: 0 16px;
  font-size: 16px;
`;
const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  width: 366px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  a {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    font-style: bold;
    text-decoration: none;
    color: #131313;
  }
`;
