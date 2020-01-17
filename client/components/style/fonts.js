// @flow strict
import { createGlobalStyle } from 'styled-components';
import cdn from '/modules/cdn';

const proxima = {
    regular: {
        woff: cdn('/next_static/fonts/ProximaNova/ProximaNova-Regular.woff'),
        eot: cdn('/next_static/fonts/ProximaNova/ProximaNova-Regular.eot?#iefix'),
        otf: cdn('/next_static/fonts/ProximaNova/ProximaNova-Regular.otf'),
        svg: cdn(
            '/next_static/fonts/ProximaNova/ProximaNova-Regular.svg#ProximaNova-Regular'
        ),
    },
    medium: {
        woff: cdn('/next_static/fonts/ProximaNova/ProximaNova-Medium.woff'),
        eot: cdn('/next_static/fonts/ProximaNova/ProximaNova-Medium.eot?#iefix'),
        otf: cdn('/next_static/fonts/ProximaNova/ProximaNova-Medium.otf'),
        svg: cdn(
            '/next_static/fonts/ProximaNova/ProximaNova-Medium.svg#ProximaNova-Medium'
        ),
    },
    bold: {
        woff: cdn('/next_static/fonts/ProximaNova/ProximaNova-Bold.woff'),
        eot: cdn('/next_static/fonts/ProximaNova/ProximaNova-Bold.eot?#iefix'),
        otf: cdn('/next_static/fonts/ProximaNova/ProximaNova-Bold.otf'),
        svg: cdn('/next_static/fonts/ProximaNova/ProximaNova-Bold.svg#ProximaNova-Bold'),
    },
};

export default createGlobalStyle`
    @font-face {
        font-family: ProximaNova;
        font-weight: normal;
        font-style: normal;
        src:
            url(${proxima.regular.woff}) format('woff'),
            url(${proxima.regular.eot}) format('embedded-opentype'),
            url(${proxima.regular.otf}) format('opentype'),
            url(${proxima.regular.svg}) format('svg');
    }

    @font-face {
        font-family: ProximaNova;
        font-weight: 500;
        font-style: normal;
        src:
            url(${proxima.medium.woff}) format('woff'),
            url(${proxima.medium.eot}) format('embedded-opentype'),
            url(${proxima.medium.otf}) format('opentype'),
            url(${proxima.medium.svg}) format('svg');
    }

    @font-face {
        font-family: ProximaNova;
        font-weight: bold;
        font-style: normal;
        src:
            url(${proxima.bold.woff}) format('woff'),
            url(${proxima.bold.eot}) format('embedded-opentype'),
            url(${proxima.bold.otf}) format('opentype'),
            url(${proxima.bold.svg}) format('svg');
    }
`;
