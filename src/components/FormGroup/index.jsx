import PropTypes from "prop-types";
import styled from "styled-components";

export default function FormGroup({ children, error }) {
  return (
    <Container>
      <div className="form-item">{children}</div>

      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
};
const Container = styled.div`
  & + & {
    margin-top: 4%;
  }
  small {
    color: #fc5050;
    font-size: 1rem;
    display: block;
    margin-top: 2%;
  }
`;
