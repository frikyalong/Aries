import { Icon } from 'antd';
import React from 'react';
import styled from 'styled-components';

const TrendWrapper = styled.div`
    display: inline-block;
    font-size: 14px;
    line-height: 22px;

    .up,
    .down {
        position: relative;
        top: 1px;
        margin-left: 4px;
        i {
            font-size: 12px;
            transform: scale(0.83);
        }
    }
    .up {
        color: red;
    }
    .down {
        top: -1px;
        color: green;
    }

    &.trendItemGrey .up,
    &.trendItemGrey .down {
        color: grey;
    }

    &.reverseColor .up {
        color: green;
    }
    &.reverseColor .down {
        color: red;
    }
`;

const Trend = ({ colorful = true, reverseColor = false, flag, children, ...rest }) => {
    return (
        <TrendWrapper {...rest} title={typeof children === 'string' ? children : ''}>
            <span>{children}</span>
            {flag && (
                <span className={flag}>
                    <Icon type={`caret-${flag}`} />
                </span>
            )}
        </TrendWrapper>
    );
};

export default Trend;
