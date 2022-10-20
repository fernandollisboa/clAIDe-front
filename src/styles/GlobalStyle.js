import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
      background-color: var(--color-0);
      font-family: "Roboto", Sans-Serif;
      width: 100%;
      max-width: 100vw;
      height: 100%;
    }
    *{
      font-family: "Roboto", Sans-Serif;
      box-sizing: border-box;
    }
`;

export default GlobalStyle;
