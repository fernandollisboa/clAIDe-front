import { Oval } from "react-loader-spinner";
import styled from "styled-components";

export default function Loader(props) {
  return (
    <StyledLoaderWrapper>
      <Oval color="#486FBD" secondaryColor />
    </StyledLoaderWrapper>
  );
}

const StyledLoaderWrapper = styled.div`
  width: 100%;
  flex: 1;
  min-height: 30vh;
  font-size: 40px;
  line-height: 300%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1230px) {
    width: 100%;
  }
`;
