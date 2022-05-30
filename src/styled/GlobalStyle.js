import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.darkShade};

    body {
      background-color: ${({ theme }) => theme.main};
    }
  }
`;
