import React, { Component } from 'react';
import CardWidgetWrapper from './Card.styles';

export default class CardWidget extends Component {
    render() {
        const { icon, iconcolor, number, text } = this.props;
        const iconStyle = {
            color: iconcolor,
        };

        return (
            <CardWidgetWrapper className="isoCardWidget">
                <div className="isoIconWrapper" style={iconStyle}>
                    {icon}
                </div>

                <div className="isoContentWrapper">
                    <h3 className="isoStatNumber">{number}</h3>
                    <span className="isoLabel">{text}</span>
                </div>
            </CardWidgetWrapper>
        );
    }
}
