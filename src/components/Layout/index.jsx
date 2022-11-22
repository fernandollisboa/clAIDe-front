import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "../Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
const Container = styled.div``;

const Footer = styled.div`
  height: 70px;
  background: #486fbd;
  width: 100%;
  bottom: 0;
  position: absolute;
`;
