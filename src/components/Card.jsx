import styled from "styled-components";

export default styled.div`
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.184);
  border-radius: 15px;
  margin: 0 0.5% 1% 0.5%;
  padding: 1.2%;
  min-width: 20%;
  width: 500px;
  cursor: pointer;
  justify-content: space-between;
  border: ${({ isSelected }) => (isSelected ? "2px solid black" : "1px solid rgba(0, 0, 0, 0.04)")};
  &:hover {
    transition: all 50ms ease-in;
    transform: scale(0.98);
    background-color: #f8f8f8d3;
    border-color: #486fbd;
    border-radius: 5px;
  }
`;
