import styled from "styled-components";

export default function NoDataMessage(props) {
  return <NoDataWrapper>{props.message || "Sem dados por enquanto"}</NoDataWrapper>;
}

const NoDataWrapper = styled.div`
  width: 100%;
  margin-top: 5%;
  color: grey;
  text-align: center;
  font-size: 2rem;
  font-family: "CircularStd-Medium", sans-serif;
`;
