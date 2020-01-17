// @flow strict
import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import LogoSrc from '../../static/logo-v2.svg';

const LogoWrapper = styled.div.attrs(props => ({
    className: classnames(props.className, {
        mini: props.mini,
    }),
}))`
    color: #fff;

    &.mini {
        width: 34px;
        height: 29px;
        overflow: hidden;
    }
`;
const Logo = props => {
    let size = {
        width: 150,
        height: 33,
    };
    if (props.large) {
        size = {
            width: 180,
            height: 47,
        };
    }
    if (props.mini) {
        size = {
            width: 129,
            height: 29,
        };
    }

    return (
        <LogoWrapper {...props}>
            <LogoSrc {...size} />
        </LogoWrapper>
    );
};

export default Logo;
