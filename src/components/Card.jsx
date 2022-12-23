import styled from "styled-components";

export default styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid ${({ selected }) => (selected ? "black" : "none")};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 1.2%;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    transition: all 200ms ease-in;
    transform: scale(0.93);
  }
`;
