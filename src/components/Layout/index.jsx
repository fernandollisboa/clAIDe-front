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
  height: 98%;
  padding-top: 8%;
  padding-bottom: 4%;
  overflow: auto;
`;

const LayoutContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Footer = styled.div`
  height: 6%;
  background: #486fbd;
  width: 100%;
  bottom: 0;
  position: absolute;
`;
