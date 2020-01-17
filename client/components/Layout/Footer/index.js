// @flow strict
import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import * as colors from '/components/style/colors';
import FlexView from '/components/FlexView';

const FootBar = styled(FlexView)`
    color: ${colors.text.gray};
    background-color: ${colors.brandV2.blue_15};
    z-index: 2;
    padding: 0 20px;
    height: 60px;

    & > ${FlexView} {
        height: 100%;
    }
`;

const TextLinkWrapper = styled(FlexView)`
    justify-content: space-between;

    margin-top: 10px;
    margin-left: 0 !important;
    flex-grow: 1;
    flex-basis: 400px;
    justify-content: flex-end;
    line-height: 20px;
`;

const Copyright = styled.span`
    white-space: nowrap;
    color: inherit;
`;

const TextLink = styled.a`
    text-decoration: none;
    white-space: nowrap;
    color: inherit;

    &:hover,
    &:focus {
        text-decoration: underline;
    }

    &::before {
        content: '|';
        display: inline-block;
        height: 100%;
        padding-right: 10px;
        color: ${colors.text.gray};
    }
`;

const SiteHeader = () => {
    return (
        <FootBar>
            <TextLinkWrapper flexWrap shrink gutter="10px">
                <Copyright className="copyright">
                    © {new Date().getFullYear()} App Annie
                </Copyright>
                <TextLink href="/">About App Annie</TextLink>

                <TextLink href="https://helpcenter.appannie.com">Support</TextLink>

                <TextLink href="https://helpcenter.appannie.com/community/s/topic/0TO6F000000BvdtWAC/api-v13">
                    API
                </TextLink>

                <TextLink href="/legal/security/?_ref=footer">Security</TextLink>

                <TextLink href="/legal/data-usage-policy/?_ref=footer">
                    Data Usage Policy
                </TextLink>

                <TextLink href="/legal/copyright/?_ref=footer">Copyright Policy</TextLink>
            </TextLinkWrapper>
        </FootBar>
    );
};

export default SiteHeader;
