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
  height: 100%;
  padding-top: 8%;
  overflow: auto;
`;

const LayoutContainer = styled.div`
  height: 94vh;
  width: 100vw;
  position: relative;
`;

const Footer = styled.div`
  height: 6vh;
  background: #486fbd;
  width: 100%;
  bottom: 0;
`;
