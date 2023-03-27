import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/foto_lsd.svg";
import useAuth from "hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <HeaderContainer>
      <Container>
        <IconContainer>
          <img src={logo} alt="logo lsd" onClick={() => navigate("/members")} />
        </IconContainer>
        <NavBar>
          <StyledLink to="/members">Membros</StyledLink>
          <StyledLink to="/projects">Projetos</StyledLink>
          <StyledLink to="/activity">Log de Atividades</StyledLink>
        </NavBar>
        <IconContainer>
          <LogoutIcon onClick={logout} />
        </IconContainer>
      </Container>
    </HeaderContainer>
  );
}

const StyledLink = styled(Link)`
  padding: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  font-style: bold;
  text-decoration: none;
  color: #131313;
  transition: 0.3s;
  border-bottom: 0.1px solid transparent;
  :hover {
    background-color: #edeaead4;
    border-color: #486fbd;
    border-radius: 5px;
    color: #486fbd;
  }
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100vw;
  z-index: 1;
  background-color: #ffffff75f;
  height: 8%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  border: none;
  border: 2px solid #fff;
  font-size: 1.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  padding: 0 1%;
`;

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  width: 50%;
  align-items: center;
  justify-content: space-around;
`;

const LogoutIcon = styled(IoLogOutOutline)`
  cursor: pointer;
  font-size: 6rem;
  padding-left: 10%;
  border-radius: 8px;
  :hover {
    color: #cf0f0fc3;
  }
`;

const IconContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  img {
    cursor: pointer;
    width: 100%;
  }
`;
