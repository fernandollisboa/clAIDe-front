import PropTypes from "prop-types";
import styled from "styled-components";

export default function Button({ type, children, onClick, disabled }) {
  return (
    <ButtonStyle type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyle>
  );
}
Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  type: "button",
  onClick: undefined,
};
const ButtonStyle = styled.button`
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  background: #486fbd;
  padding: 0 1%;
  height: 52px;
  color: #fff;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  &:hover {
    background: #6674f4;
  }
  &:active {
    background: #3346f0;
  }
  &[disabled] {
    background: #ccc !important;
    cursor: default !important;
  }
`;
