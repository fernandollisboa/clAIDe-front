import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
      background-color: #F6F5FC;
      font-family: 'CircularStd-Medium', sans-serif;
      font-size: 12px;
      margin: 0px;
      caret-color: transparent;
    }
    *{
      box-sizing: border-box;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, black 600000s 0s;
    }

    @font-face {
      font-family: 'CircularStd-Medium';
      src: url("assets/fonts/CircularStd-Medium.otf") format("opentype")
      font-weight: normal;
      font-style: normal;
    }
  
`;

export default GlobalStyle;
