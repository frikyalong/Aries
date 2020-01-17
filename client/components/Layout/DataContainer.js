// @flow strict
import * as React from 'react';
import styled from 'styled-components';
import FlexView from '/components/FlexView';
import * as colors from '/components/style/colors';

export const Wrapper = styled(FlexView).attrs({
    column: true,
    grow: true,
    shrink: true,
    gutter: '10px',
})`
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 3px;
    display: block;
`;

const Header = styled(FlexView).attrs({
    grow: true,
    gutter: '10px',
})`
    border-bottom: 1px solid ${colors.background.gray2};
    padding-bottom: 10px;
    margin-bottom: 15px;
`;

const ActionsWrapper = styled(FlexView).attrs({ gutter: '6px' })`
    margin-bottom: 25px;
`;

const BaseText = styled.span`
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Title = styled(BaseText)`
    font-weight: 500;
    font-size: 22px;
    color: ${colors.brandV2.blue};
    line-height: 1;
`;

const Info = styled(BaseText)`
    font-size: 12px;
    margin-left: 5px;
`;

const NoticeWrapper = styled(FlexView)`
    font-size: 11px;
`;

const DataContainer = ({
    title,
    info,
    pickers,
    actions,
    notice,
    children,
    className,
}) => {
    let header;
    if (title || info || pickers) {
        header = (
            <Header>
                <FlexView
                    grow
                    shrink
                    vAlignContent="bottom"
                    title={[
                        typeof title === 'string' ? title : undefined,
                        typeof info === 'string' ? info : undefined,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                >
                    <Title>{title}</Title>
                    <Info>{info}</Info>
                </FlexView>
                <FlexView gutter="6px">{pickers}</FlexView>
            </Header>
        );
    }
    let noticeWrapper;
    if (notice) {
        noticeWrapper = (
            <NoticeWrapper column gutter="5px">
                {notice}
            </NoticeWrapper>
        );
    }
    return (
        <Wrapper className={className}>
            {header}
            {actions && <ActionsWrapper>{actions}</ActionsWrapper>}
            {children}
            {noticeWrapper}
        </Wrapper>
    );
};

export default DataContainer;
