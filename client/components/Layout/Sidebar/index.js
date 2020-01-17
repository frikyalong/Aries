import React from 'react';
import styled from 'styled-components';
import FlexView from '/components/FlexView';
import * as colors from '/components/style/colors';
import Logo from '/components/Logo';
import Text from '/components/Text';
import Link from '/components/Link';
import { SidebarLink } from './link';
import isCurrent from './utils';
import { home, menuLists } from './config';

const Main = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: ${colors.brandV2.blue};
    color: #fff;
    font-size: 13px;
    line-height: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none;
    transition: width 0.25s 0.2s;
    z-index: 2;
    pointer-events: auto;
`;

const Content = styled.div`
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transition: opacity 0.25s 0.2s, visibility 0.25s 0.2s;
`;

const LogoLink = styled(Link)`
    display: block;
    position: relative;
    height: 60px;
    margin-bottom: 20px;
`;

const LogoDefault = styled(FlexView)`
    position: absolute;
    top: 18px;
    left: 20px;
    color: ${colors.brand.persianGreen};
    font-size: 9px;
    transition: opacity 0.25s 0.2s, visibility 0.25s 0.2s;
    opacity: 1;
    visibility: visible;
`;

const MenuGroup = styled.div`
    margin-bottom: 10px;
`;

const Title = styled(Text)`
    text-transform: uppercase;
    height: 14px;
    font-weight: bold;
`;
const SubMenuTitle = styled(Text)`
    line-height: 1;
    padding-left: 15px;
    font-weight: 500;
`;

const menus = (menuLists, current) => {
    return menuLists.map(menu => {
        return (
            <MenuGroup key={menu.id}>
                <SidebarLink
                    key={menu.id}
                    href={menu.href}
                    isActive={isCurrent(menu, current)}
                    style={{ textTransform: 'uppercase' }}
                >
                    <Title ellipsis>{menu.title}</Title>
                </SidebarLink>
                {menu.children &&
                    menu.children.map(subMenu => (
                        <SidebarLink
                            key={subMenu.id}
                            href={subMenu.href}
                            isActive={isCurrent(subMenu, current)}
                            style={{ textTransform: 'uppercase' }}
                        >
                            <SubMenuTitle ellipsis>{subMenu.title}</SubMenuTitle>
                        </SidebarLink>
                    ))}
            </MenuGroup>
        );
    });
};

const Sidebar = ({ current }) => {
    return (
        <Main>
            <LogoLink href={home.key} linkAs={home.key}>
                <LogoDefault>
                    <Logo />
                </LogoDefault>
            </LogoLink>
            <Content>
                <SidebarLink
                    href={home.href}
                    linkAs={home.linkAs}
                    isActive={isCurrent(home, current)}
                >
                    <Title ellipsis>{home.title}</Title>
                </SidebarLink>
                {menus(menuLists, current)}
            </Content>
        </Main>
    );
};
export default Sidebar;
