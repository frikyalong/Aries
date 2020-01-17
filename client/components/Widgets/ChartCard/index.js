import React, { Component } from 'react';
import { Card } from 'antd';
import ChartCardWrapper from './ChartCard.styles';

const renderTotal = total => {
    if (!total && total !== 0) {
        return null;
    }

    let totalDom;

    switch (typeof total) {
        case 'undefined':
            totalDom = null;
            break;

        case 'function':
            totalDom = <div className="total">{total()}</div>;
            break;

        default:
            totalDom = <div className="total">{total}</div>;
    }

    return totalDom;
};

export default class CardWidget extends Component {
    render() {
        const {
            loading = false,
            contentHeight,
            title,
            avatar,
            action,
            total,
            footer,
            children,
            ...rest
        } = this.props;
        return (
            <ChartCardWrapper>
                <Card
                    loading={loading}
                    bodyStyle={{
                        padding: '20px 24px 8px 24px',
                    }}
                    {...rest}
                >
                    <div className="chartCard">
                        <div className="chartTopMargin">
                            <div className="avatar">{avatar}</div>
                            <div className="metaWrap">
                                <div className="meta">
                                    <span className="title">{title}</span>
                                    <span className="action">{action}</span>
                                </div>
                                {renderTotal(total)}
                            </div>
                        </div>
                        {children && (
                            <div
                                className="content"
                                style={{
                                    height: contentHeight || 'auto',
                                }}
                            >
                                <div className={contentHeight && 'contentFixed'}>
                                    {children}
                                </div>
                            </div>
                        )}
                        {footer && <div className="footerMargin">{footer}</div>}
                    </div>
                </Card>
            </ChartCardWrapper>
        );
    }
}
