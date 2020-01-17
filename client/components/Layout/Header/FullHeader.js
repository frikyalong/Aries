// @flow strict
import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Link from '/components/Link';
import * as colors from '/components/style/colors';
import Text from '/components/Text';
import { withUser } from '/modules/user';
import FlexView from '/components/FlexView';
import LogoSrc from '/static/aa-header-logo.svg';
import LoadingOverlay from '/components/LoadingOverlay';

const HeaderBar = styled(FlexView)`
    font-size: 14px;
    color: ${colors.brand.bigStone};
    z-index: 2;
    padding: 0;
    height: 60px;
    padding-right: 10px;

    & > ${FlexView} {
        height: 100%;
    }
`;

const UserInfoWrapper = styled(FlexView)`
    padding: 10px 0 5px;
    span {
        padding: 0 18px;
    }
`;

const LogoutLink = styled(Link)`
    display: block;
    padding: 7px 15px;
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    white-space: nowrap;
`;

const LogoWrapper = styled(FlexView)`
    padding-left: 40px;
`;

const SiteHeader = ({ user }) => {
    return (
        <HeaderBar>
            <FlexView grow gutter="15px" vAlignContent="stretch">
                <LogoWrapper>
                    <LogoSrc width="140px" />
                </LogoWrapper>
            </FlexView>
            <FlexView>
                <UserInfoWrapper>
                    <span title={user.email}>
                        <Text
                            ellipsis
                        >{`${user.surveyFirstName} ${user.surveyLastName} from ${user.jobFunction} team`}</Text>
                    </span>
                    |
                    <LogoutLink href="/account/logout/" rel="noopener noreferrer">
                        Log Out
                    </LogoutLink>
                </UserInfoWrapper>
            </FlexView>
        </HeaderBar>
    );
};

export default withUser(SiteHeader);
