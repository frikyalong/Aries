// @flow strict
import { createGlobalStyle } from 'styled-components';
import * as colors from './colors';

export const MODAL_OPEN_CLASS_NAME = 'modal-open';

export default createGlobalStyle`
    html,
    body,
    #__next {
        height: 100%;
    }

    body {
        font-family: ProximaNova, Helvetica, Arial, sans-serif;
        color: ${colors.brandV2.blue};
        font-size: 13px;
        font-feature-settings: 'tnum';
        overflow-y: scroll;

        /* Turn on font-smoothing feature where available */
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        /* Prevents breaking lines in the middle of words of languages without spaces like
           Korean. */
        word-break: keep-all;

    }

    body.${MODAL_OPEN_CLASS_NAME} {
        overflow-y: hidden;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit;
    }

    input[type="checkbox"],
    input[type="radio"] {
        cursor: pointer;
    }
`;
