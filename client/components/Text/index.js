// @flow strict
import styled from 'styled-components';

const Text = styled.div`
    color: inherit;

    /* If the line height is 1.1 or lower, then we cut the top of chinese and
       japanese characters */
    line-height: 1.2;

    /* text ellipsis */
    word-break: ${props => (props.ellipsis ? 'break-all' : 'inherit')};
    white-space: ${props => (props.ellipsis ? 'nowrap' : 'inherit')};
    text-overflow: ${props => (props.ellipsis ? 'ellipsis' : 'inherit')};
    overflow: ${props => (props.ellipsis ? 'hidden' : 'inherit')};
`;

export default Text;
