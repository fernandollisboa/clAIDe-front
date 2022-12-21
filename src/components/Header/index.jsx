import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/foto_lsd.svg";
import profile from "../../assets/profile.svg";

export default function Header() {
  const navigate = useNavigate();
  function logout() {
    window.localStorage.removeItem("claideToken");
    navigate("/");
  }
  return (
    <HeaderContainer>
      <Container>
        <img src={logo} alt="logo lsd" />
        <NavBar>
          <Link to="/members">Membros</Link>
          {/* <Link to="/teachers">Professores</Link> */}
        </NavBar>
        <img src={profile} alt="account" onClick={logout} />
      </Container>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  max-width: 100%;
  align-items: center;
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
  justify-content: space-around;
  a {
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    font-style: bold;
    text-decoration: none;
    color: #131313;
  }
`;
