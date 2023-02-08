import PropTypes from "prop-types";
import styled from "styled-components";

export default function FormGroup({ children, error }) {
  return (
    <Container>
      <div className="form-item">{children}</div>

      <ErrorMessage>{error}</ErrorMessage>
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
  margin: 0 3% 2% 0;
`;

const ErrorMessage = styled.div`
  color: #fc5050;
  font-size: 1rem;
  margin: 2%;
  margin-bottom: 0;
  height: 1rem;
`;
