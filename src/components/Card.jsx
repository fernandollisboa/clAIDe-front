import styled from "styled-components";

export default styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 15px;
  justify-content: space-between;
  &:hover {
    transition: all 200ms ease-in;
    transform: scale(0.93);
  }
`;
