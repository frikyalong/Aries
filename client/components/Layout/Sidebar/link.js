// @flow strict
import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import LinkSelector from '/components/Link';
import FlexView from '/components/FlexView';
import * as colors from '/components/style/colors';

const BlankLink = styled(LinkSelector)`
    color: inherit;
    text-decoration: none;
    display: block;
    padding: 7px 10px 7px 20px;
    line-height: 1;
    font-size: 14px;
`;

const Link = ({ href, linkAs, icon, isExternal, className, children }) => {
    const content = children;

    return (
        <BlankLink
            href={href}
            linkAs={linkAs}
            target={isExternal ? '_blank' : '_self'}
            className={classnames(className, 'SidebarLink')}
        >
            <FlexView gutter="3px">
                {icon ? <FlexView shrink={false}>{icon}</FlexView> : null}
                <FlexView grow shrink>
                    {content}
                </FlexView>
            </FlexView>
        </BlankLink>
    );
};

const SidebarLink = styled(Link).attrs(props => ({
    className: classnames(props.className, {
        'is-active': props.isActive,
    }),
}))`
    color: ${colors.text.white};
    cursor: pointer;
    line-height: 1;

    &:hover,
    &.is-active {
        background-color: ${colors.brandV2.blue_75};
    }
`;

export default Link;
export { SidebarLink };
