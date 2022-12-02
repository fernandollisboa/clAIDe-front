import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
      background-color: #F6F5FC;
      font-family: 'Century Gothic', sans-serif;
      font-size: 12px;
      margin: 0px;
      caret-color: transparent;
    }
    *{
      box-sizing: border-box;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
    }
  
`;

export default GlobalStyle;
