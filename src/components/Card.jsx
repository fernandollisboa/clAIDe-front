import styled from "styled-components";

export default styled.div`
  display: flex;
  width: 300px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 1.2%;
  justify-content: space-between;
  .info {
    font-size: 0.8rem;

    .name {
      font-size: 1rem;
      font-weight: 700;
    }
    div {
      margin-bottom: 3%;
    }
    span {
      color: #bcbcbc;
    }
  }
`;
