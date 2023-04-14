import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
const Main = styled.div`
  height: 100%;
  padding-top: 8%;
  overflow: auto;
  @media screen and (max-width: 992px) {
    padding-top: 20%;
  }
`;

const LayoutContainer = styled.div`
  height: 94vh;
  width: 100vw;
`;

const Footer = styled.div`
  height: 6vh;
  background: #486fbd;
  width: 100%;
  bottom: 0;
`;
