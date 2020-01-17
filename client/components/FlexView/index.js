// @flow strict
import * as React from 'react';
import styled, { css } from 'styled-components';

const alignToFlex = {
    top: 'flex-start',
    left: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    right: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
};

const FlexView = styled.div.attrs({
    className: 'FlexView',
})`
    display: ${props => (props.inline ? 'inline-flex' : 'flex')};
    flex-direction: ${props => (props.column ? 'column' : 'row')};
    flex-grow: ${props => {
        if (typeof props.grow === 'number') {
            return props.grow;
        }

        return props.grow ? 1 : 0;
    }};
    flex-shrink: ${props => {
        if (typeof props.shrink === 'number') {
            return props.shrink;
        }

        return props.shrink ? 1 : 0;
    }};
    flex-wrap: ${props => {
        if (typeof props.flexWrap === 'string') {
            return props.flexWrap;
        }

        return props.flexWrap ? 'wrap' : 'nowrap';
    }};
    flex-basis: ${props => (props.basis != null ? props.basis : 'auto')};
    align-items: ${props => {
        if (props.column) {
            return alignToFlex[props.hAlignContent || 'left'];
        }
        return alignToFlex[props.vAlignContent || 'center'];
    }};
    justify-content: ${props => {
        if (props.column) {
            return alignToFlex[props.vAlignContent || 'top'];
        }
        return alignToFlex[props.hAlignContent || 'left'];
    }};
    min-width: ${props => (Number(props.grow) > 0 ? 0 : 'auto')};
    max-width: 100%;
    box-sizing: border-box;

    & > :nth-child(n + 2) {
        ${props => {
            if (!props.column && props.gutter) {
                return css`
                    margin-left: ${props.gutter};
                `;
            }
            if (props.column && props.gutter) {
                return css`
                    margin-top: ${props.gutter};
                `;
            }
            return '';
        }};
    }

    & > svg,
    & > img,
    & > i,
    & > input[type='checkbox'],
    & > input[type='radio'] {
        flex-shrink: 0;
    }

    & > .FlexView {
        ${props =>
            props.column
                ? css`
                      width: 100%;
                  `
                : ''};
    }
`;
FlexView.displayName = 'FlexView';

export default FlexView;
