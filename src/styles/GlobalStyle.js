import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
      background-color: #F6F5FC;
      font-family: 'CircularStd-Medium', sans-serif;
      width: 100%;
      max-width: 100vw;
    }
    *{
      font-family:'CircularStd-Medium', sans-serif;
      box-sizing: border-box;
    }
`;

export default GlobalStyle;
