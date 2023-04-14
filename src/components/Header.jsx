import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import logo from "../assets/foto_lsd.svg";
import NavigationIcons from "components/NavigationIcons";
import useAuth from "hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <HeaderContainer>
      <Container>
        <IconContainer>
          <img src={logo} alt="logo lsd" onClick={() => navigate("/home")} />
        </IconContainer>
        <NavBar>
          <NavigationIcons />
        </NavBar>
        <IconContainer>
          <LogoutIcon onClick={logout} />
        </IconContainer>
      </Container>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
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
