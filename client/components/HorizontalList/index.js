// @flow strict
import * as React from 'react';
import styled from 'styled-components';
import FlexView from '/components/FlexView';
import * as colors from '/components/style/colors';

const Column = styled(FlexView).attrs({
    grow: 1,
    shrink: 1,
    column: true,
    basis: '100px',
})``;

const ItemWrapper = styled(FlexView)`
    padding: 10px 0;
    & + & {
        border-top: 1px solid ${colors.brand.concrete};
    }
`;

const ListWrapper = styled(FlexView)`
    overflow-x: auto;

    ${Column} {
        max-width: ${props => props.maxColumnWidth};
        min-width: ${props => props.minColumnWidth};
    }
`;

const HorizontalList = ({
    rowCount,
    items,
    showRank,
    minColumnWidth = '0',
    maxColumnWidth = '100%',
    minRankWidth = '20px',
    className,
}) => {
    const columns = items.reduce(
        (emergingColumns, item) => {
            const currentColumn = emergingColumns[emergingColumns.length - 1];
            if (currentColumn.length < rowCount) {
                currentColumn.push(item);
            } else {
                emergingColumns.push([item]);
            }
            return emergingColumns;
        },
        [[]]
    );
    return (
        <ListWrapper
            vAlignContent="top"
            gutter="15px"
            grow
            minColumnWidth={minColumnWidth}
            maxColumnWidth={maxColumnWidth}
            className={className}
        >
            {columns.map((node, columnIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <Column key={columnIndex}>
                    {node.map((item, rowIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <ItemWrapper key={rowIndex} gutter="10px">
                            {showRank && item.rank && (
                                <FlexView basis={minRankWidth}>{item.rank}</FlexView>
                            )}
                            {item.node}
                        </ItemWrapper>
                    ))}
                </Column>
            ))}
        </ListWrapper>
    );
};

export default HorizontalList;
