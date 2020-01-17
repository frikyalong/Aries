import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import Head from 'next/head';
import { Icon } from 'antd';
import Layout, { DataWrapper, DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import Badge from '/components/uielements/badge';
import Tooltip from '/components/uielements/tooltip';
import Tag from '/components/uielements/tag';
import Dropdown, {
    DropdownButtons,
    DropdownMenu,
    MenuItem,
    SubMenu,
} from '/components/uielements/dropdown';
import Menu from '/components/uielements/menu';
import Button from '/components/uielements/button';
import Tree, { TreeNode } from '/components/uielements/tree';
import withAAContext from '/modules/pages/withAAContext';

const TooltipWrapper = styled.div`
    .tooltipBtn {
        display: inline-block;
        line-height: 32px;
        height: 32px;
        width: 70px;
        font-size: 14px;
        text-align: center;
        background: ${palette('secondary', 1)};
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '6px')};
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '6px' : '0')};
        margin-bottom: 6px;
        border-radius: 6px;
    }
`;
const MenuDivider = Menu.Divider;
const DropdownButton = DropdownButtons;
const demoStyle = {
    marginBottom: '8px',
    marginRight: '8px',
};
const menuHover = (
    <DropdownMenu>
        <MenuItem>
            <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
                1st menu item
            </a>
        </MenuItem>
        <MenuItem>
            <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
                2nd menu item
            </a>
        </MenuItem>
        <MenuItem>
            <a target="_blank" rel="noopener noreferrer" href="http://redq.io/">
                3d menu item
            </a>
        </MenuItem>
    </DropdownMenu>
);
const text = <span>uiElements.tooltip.contentSpan</span>;
const preventDefault = e => {
    e.preventDefault();
};
const log = e => {};
const Index = ({ pathname }) => {
    return (
        <Layout pathname={pathname}>
            <Head>
                <title>App Annie - Admin - Demo - UI</title>
            </Head>

            <DataWrapper>
                <FlexView vAlignContent="stretch" gutter="20px">
                    <FlexView column gutter="20px">
                        <DataContainer title="Badge - Basic" gutter="20px">
                            <FlexView gutter="50px">
                                <Badge count={5}>
                                    <a className="isoBadgeLink" href="# ">
                                        {' '}
                                    </a>
                                </Badge>
                                <Badge count={0} showZero>
                                    <a className="isoBadgeLink" href="# ">
                                        {' '}
                                    </a>
                                </Badge>
                            </FlexView>
                        </DataContainer>
                        <DataContainer title="Badge - Overflow Count" gutter="20px">
                            <FlexView gutter="50px">
                                <Badge count={99}>
                                    <a className="isoBadgeLink" href="# ">
                                        {' '}
                                    </a>
                                </Badge>
                                <Badge count={100}>
                                    <a className="isoBadgeLink" href="# ">
                                        {' '}
                                    </a>
                                </Badge>
                                <Badge count={99} overflowCount={10}>
                                    <a className="isoBadgeLink" href="# ">
                                        {' '}
                                    </a>
                                </Badge>
                                <Badge count={1000} overflowCount={999}>
                                    <a className="isoBadgeLink" href="# ">
                                        {' '}
                                    </a>
                                </Badge>
                            </FlexView>
                        </DataContainer>
                        <DataContainer title="Badge - red badge" gutter="20px">
                            <FlexView gutter="50px">
                                {' '}
                                <Badge dot>
                                    <Icon type="notification" />
                                </Badge>
                                <Badge dot>
                                    <a href=".">linkSomething</a>
                                </Badge>
                            </FlexView>
                        </DataContainer>
                        <DataContainer title="Badge - Status">
                            <Badge status="success" />
                            <Badge status="error" />
                            <Badge status="default" />
                            <Badge status="processing" />
                            <Badge status="warning" />
                            <br />
                            <br />
                            <Badge status="success" text="success" />
                            <br />
                            <Badge status="error" text="error" />
                            <br />
                            <Badge status="default" text="default" />
                            <br />
                            <Badge status="processing" text="processing" />
                            <br />
                            <Badge status="warning" text="warning" />
                        </DataContainer>
                    </FlexView>
                    <FlexView column gutter="20px">
                        <DataContainer title="Apps you might be interested in">
                            <TooltipWrapper>
                                <Tooltip placement="rightTop" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "RT"
                                    </a>
                                </Tooltip>
                                <Tooltip placement="right" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "right"
                                    </a>
                                </Tooltip>
                                <Tooltip placement="rightBottom" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "RB"
                                    </a>
                                </Tooltip>
                            </TooltipWrapper>
                        </DataContainer>
                        <DataContainer title="Apps you might be interested in">
                            <TooltipWrapper>
                                <Tooltip placement="topLeft" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "TL"
                                    </a>
                                </Tooltip>
                                <Tooltip placement="top" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "top"
                                    </a>
                                </Tooltip>
                                <Tooltip placement="topRight" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "TR"
                                    </a>
                                </Tooltip>
                                <Tooltip placement="leftTop" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "LT"
                                    </a>
                                </Tooltip>
                                <Tooltip placement="left" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "left"
                                    </a>
                                </Tooltip>
                                <Tooltip placement="leftBottom" title={text}>
                                    <a className="tooltipBtn" href="# ">
                                        "LB"
                                    </a>
                                </Tooltip>
                            </TooltipWrapper>
                        </DataContainer>
                        <DataContainer title="Tag">
                            <Tag>tagOne</Tag>
                            <Tag>
                                <a href="https://isomorphic.redq.io/dashboard/op_tag">
                                    link
                                </a>
                            </Tag>
                            <Tag closable onClose={log}>
                                tagTwo
                            </Tag>
                            <Tag closable onClose={preventDefault}>
                                preventDefault
                            </Tag>
                            <br />
                            <Tag color="#f50">#f50</Tag>
                            <Tag color="#2db7f5">#2db7f5</Tag>
                            <Tag color="#87d068">#87d068</Tag>
                            <Tag color="#108ee9">#108ee9</Tag>
                            <br />
                        </DataContainer>
                        <DataContainer title="dropdown">
                            <Dropdown overlay={menuHover}>
                                <a className="ant-dropdown-link" href="# ">
                                    dropdown.hoverMe <Icon type="down" />
                                </a>
                            </Dropdown>
                            <Dropdown overlay={menuHover} placement="bottomLeft">
                                <Button style={demoStyle}>bottomLeft</Button>
                            </Dropdown>
                            <Dropdown overlay={menuHover} placement="bottomCenter">
                                <Button style={demoStyle}>bottomCenter</Button>
                            </Dropdown>
                            <Dropdown overlay={menuHover} placement="bottomRight">
                                <Button style={demoStyle}>bottomRight</Button>
                            </Dropdown>
                            <br />
                            <Dropdown overlay={menuHover} placement="topLeft">
                                <Button style={demoStyle}>topLeft</Button>
                            </Dropdown>
                            <Dropdown overlay={menuHover} placement="topCenter">
                                <Button style={demoStyle}>topCenter</Button>
                            </Dropdown>
                            <Dropdown overlay={menuHover} placement="topRight">
                                <Button style={demoStyle}>topRight</Button>
                            </Dropdown>
                        </DataContainer>
                        <DataContainer title="Tree">
                            <Tree
                                checkable
                                defaultExpandedKeys={['0-0-0', '0-0-1']}
                                defaultSelectedKeys={['0-0-0', '0-0-1']}
                                defaultCheckedKeys={['0-0-0', '0-0-1']}
                            >
                                <TreeNode title="parent 1" key="0-0">
                                    <TreeNode title="parent 1-0" key="0-0-0" disabled>
                                        <TreeNode
                                            title="leaf"
                                            key="0-0-0-0"
                                            disableCheckbox
                                        />
                                        <TreeNode title="leaf" key="0-0-0-1" />
                                    </TreeNode>
                                    <TreeNode title="parent 1-1" key="0-0-1">
                                        <TreeNode
                                            title={
                                                <span style={{ color: '#08c' }}>sss</span>
                                            }
                                            key="0-0-1-0"
                                        />
                                    </TreeNode>
                                </TreeNode>
                            </Tree>
                            <Tree showLine defaultExpandedKeys={['0-0-0']}>
                                <TreeNode title="parent 1" key="0-0">
                                    <TreeNode title="parent 1-0" key="0-0-0">
                                        <TreeNode title="leaf" key="0-0-0-0" />
                                        <TreeNode title="leaf" key="0-0-0-1" />
                                        <TreeNode title="leaf" key="0-0-0-2" />
                                    </TreeNode>
                                    <TreeNode title="parent 1-1" key="0-0-1">
                                        <TreeNode title="leaf" key="0-0-1-0" />
                                    </TreeNode>
                                    <TreeNode title="parent 1-2" key="0-0-2">
                                        <TreeNode title="leaf" key="0-0-2-0" />
                                        <TreeNode title="leaf" key="0-0-2-1" />
                                    </TreeNode>
                                </TreeNode>
                            </Tree>
                        </DataContainer>
                    </FlexView>
                </FlexView>
            </DataWrapper>
        </Layout>
    );
};

Index.getInitialProps = async ({ pathname, query, req, res }) => {
    return {
        pathname,
    };
};

export default Index;
