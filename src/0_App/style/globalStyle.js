import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 
  *{
    color: ${({ theme }) => theme.color};
  }
  html{
    height: 100%;
  }
  body {
    line-height: 1;
    height: 100%;
    overscroll-behavior: none;
  }
  #root{
    height: 100%;
  }
  button{
    background-color: transparent;
    border: none;
  }
`;

export default GlobalStyles;
