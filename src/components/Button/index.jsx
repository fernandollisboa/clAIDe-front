import PropTypes from "prop-types";
import styled from "styled-components";

export default function Button({ type, children, onClick }) {
  return (
    <ButtonStyle type={type} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
}
Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  type: "button",
  onClick: undefined,
};
const ButtonStyle = styled.button`
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  background: #486fbd;
  padding: 0 16px;
  height: 52px;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  margin-top: 16px;
  &:hover {
    background: #6674f4;
  }
  &:active {
    background: #3346f0;
  }
`;
