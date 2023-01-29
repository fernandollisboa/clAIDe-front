import styled from "styled-components";

export default styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
  margin: 1% 0.5%;
  padding: 1.2%;
  cursor: pointer;
  justify-content: space-between;
  border: ${({ isSelected }) => (isSelected ? "2px solid black" : "1px solid rgba(0, 0, 0, 0.04)")};
  &:hover {
    transition: all 50ms ease-in;
    transform: scale(0.98);
  }
`;
