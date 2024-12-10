import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Sarala", sans-serif;
    word-spacing: 2px;
    font-size: 14px;
    line-height: 1.4;
    color: #000000;
    background-color: #1F2028;
    /* background-color: #FFFFFF; */
    width: 100%;
    height: 100%;
  }

  h1, h2, p {
    color: white;
  }
`;

export default GlobalStyles;