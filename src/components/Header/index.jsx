import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/foto_lsd.svg";

export default function Header() {
  const navigate = useNavigate();
  function logout() {
    window.localStorage.removeItem("claideToken");
    navigate("/");
  }
  return (
    <HeaderContainer>
      <Container>
        <img src={logo} alt="logo lsd" onClick={() => navigate("/members")} />
        <NavBar>
          <Link to="/members">Membros</Link>
          {/* <Link to="/teachers">Professores</Link> */}
          <Link to="/projects">Projetos</Link>
        </NavBar>
        <LogoutIcon onClick={logout} fontSize="5rem" />
      </Container>
    </HeaderContainer>
  );
}

const LogoutIcon = styled(IoLogOutOutline)`
  width: 20%;
  cursor: pointer;
  padding-left: 10%;
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100vw;
  z-index: 1;
  height: 10%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: none;
  border: 2px solid #fff;
  font-size: 1.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  padding: 0 1%;
  img {
    cursor: pointer;
    width: 20%;
  }
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
    font-style: bold;
    text-decoration: none;
    color: #131313;
  }
`;
