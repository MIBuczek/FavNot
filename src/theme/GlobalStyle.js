import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600');

    *,*::before, *::after{
        box-sizing : border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* font antyaliasing */
        outline:none;
    }
    html{
        font-size: 62.5%;
        /* happy rems */
    }
    body{
        padding-left: 150px;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.6rem
    }
`;

export default GlobalStyle;
