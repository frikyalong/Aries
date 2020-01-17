import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { fontSize, transition } from '/helpers/style_utils';
import FlexView from '/components/FlexView';

const ChartCardWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    overflow: hidden;
    .chartCard {
        position: relative;
        .chartTop {
            position: relative;
            width: 100%;
            overflow: hidden;
        }
        .chartTopMargin {
            margin-bottom: 12px;
        }
        .chartTopHasMargin {
            margin-bottom: 20px;
        }
        .metaWrap {
            float: left;
        }
        .avatar {
            position: relative;
            top: 4px;
            float: left;
            margin-right: 20px;
            img {
                border-radius: 100%;
            }
        }
        .meta {
            height: 22px;
            color: @text-color-secondary;
            font-size: @font-size-base;
            line-height: 22px;
        }
        .action {
            position: absolute;
            top: 4px;
            right: 0;
            line-height: 1;
            cursor: pointer;
        }
        .total {
            height: 38px;
            margin-top: 4px;
            margin-bottom: 0;
            overflow: hidden;
            color: @heading-color;
            font-size: 30px;
            line-height: 38px;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
        }
        .content {
            position: relative;
            width: 100%;
            margin-bottom: 12px;
        }
        .contentFixed {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
        .footer {
            margin-top: 8px;
            padding-top: 9px;
            border-top: 1px solid @border-color-split;
            & > * {
                position: relative;
            }
        }
        .footerMargin {
            position: relative;
            margin-top: 40px;
            overflow: hidden;
        }
    }
`;
export default ChartCardWrapper;
