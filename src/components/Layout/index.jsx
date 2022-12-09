import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "../Header";

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </LayoutContainer>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
const Container = styled.div`
  height: calc(100vh - 76px - 1%);
  padding-top: calc(166px - 1%);
  overflow: auto;
`;

const LayoutContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Footer = styled.div`
  height: 70px;
  background: #486fbd;
  width: 100%;
  bottom: 0;
  position: absolute;
`;
