import { createGlobalStyle } from 'styled-components';

import MontserratTtf from './assets/fonts/Montserrat.ttf';
import OpenSansTtf from './assets/fonts/OpenSans.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Montserrat';
        src: url(${MontserratTtf}) format('truetype');
    }
    @font-face {
        font-family: 'OpenSans';
        src: url(${OpenSansTtf}) format('truetype');
    }
    *{
        margin: auto;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }
`;
