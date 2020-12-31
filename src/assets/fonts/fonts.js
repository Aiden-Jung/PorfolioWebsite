import { createGlobalStyle } from 'styled-components';

import MontserratTtf from './Montserrat.ttf';
import OpenSansTtf from './OpenSans.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Montserrat';
        src: url(${MontserratTtf}) format('truetype');
    }
    @font-face {
        font-family: 'OpenSans';
        src: url(${OpenSansTtf}) format('truetype');
    }
`;