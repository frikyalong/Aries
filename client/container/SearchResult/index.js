import * as React from 'react';
import LoadingOverlay from '/components/LoadingOverlay';
import styled from 'styled-components';
import * as colors from '/components/style/colors';
import { createDataGetter } from '/modules/query-language/query';
import { DataContainer } from '/components/Layout';
import FlexView from '/components/FlexView';
import Link from '/components/Link';
import Text from '/components/Text';
import { useDatasource } from '/modules/SuperGrid';

const Wrapper = styled.div`
    position: relative;
    min-height: 86px;
    display: grid;
    grid-template-columns: repeat(3, 300px);
    justify-content: space-between;
    grid-row-gap: 10px;
`;

const IconWrapper = styled(FlexView)`
    position: relative;
    background-color: ${colors.background.gray2};
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};

    &.ios,
    &.ios > img {
        border-radius: 15.625%;
    }

    &.appletv.small,
    &.appletv.small > img {
        border-radius: 1px;
    }

    &.appletv.medium,
    &.appletv.medium > img {
        border-radius: 2px;
    }

    &.appletv.big,
    &.appletv.big > img {
        border-radius: 4px;
    }

    &.has-app-icon {
        background-color: transparent;
    }
`;

const EntityName = styled(FlexView).attrs({
    className: 'entity-name',
    shrink: true,
})`
    &.entity-name {
        max-width: 300px;
        overflow: hidden;
    }
`;
const SecondaryInfo = styled(Text)`
    color: ${colors.brandV2.blue_50};
`;
const SearchResult = ({ keyword }) => {
    const search = () =>
        useDatasource(
            {
                name: 'search',
                capacity: {
                    mode: 'ignore',
                    filters: {},
                    facets: [],
                },
                syncToUrl: false,
            },
            {
                facets: ['product_id'],
                filters: {
                    product_id: {
                        in: {
                            search: {
                                facets: ['product_id'],
                                filters: {
                                    and: [
                                        {
                                            vertical_code: {
                                                equal: 'app',
                                            },
                                        },
                                        {
                                            market_code: {
                                                in: ['apple-store', 'google-play'],
                                            },
                                        },
                                        {
                                            name: {
                                                match: keyword,
                                            },
                                        },
                                    ],
                                },
                                pagination: {
                                    limit: 10,
                                    offset: 0,
                                },
                            },
                        },
                    },
                },
                breakdowns: {},
                fields: {
                    product_id: {
                        category_id: {
                            fields: ['name', 'unified_category_id'],
                            unified_category_id: {
                                fields: ['name'],
                            },
                        },
                        fields: [
                            'publisher_id',
                            'name',
                            'icon_url',
                            'first_release_date',
                            'category_id',
                            'market_code',
                            'is_sensitive',
                            'status',
                        ],
                        market_code: {
                            fields: ['name'],
                        },
                        publisher_id: {
                            company_id: {
                                country_code: {
                                    fields: ['country_name'],
                                },
                                fields: ['name', 'country_code'],
                            },
                            fields: ['name', 'company_id'],
                        },
                    },
                },
            }
        );
    const datasource = search();
    const resp = datasource.getResponse();
    const data = resp.data.facets;
    const idKey = 'product_id';
    let content;
    const unifiedAppIds = data.map(item => item.unified_product_id);

    if (datasource.isLoading() && data.length === 0) {
        content = <LoadingOverlay position="absolute" opaque />;
    } else if (data.length === 0) {
        content = <>No data is available.</>;
    } else {
        content = data.map(item => {
            const getData = queryPath => {
                const getter = createDataGetter(resp.data.dimensions);
                return getter(queryPath, item);
            };
            const id = getData(idKey);
            const name = getData(`${idKey}.name`);
            const icon = getData(`${idKey}.icon_url`);
            const { width, height } = { width: 22, height: 22 };
            const company =
                getData(`${idKey}.publisher_id.company_id.name`) ||
                getData(`${idKey}.unified_product_id.company_id.name`);
            return (
                <FlexView shrink gutter="5px">
                    <FlexView gutter="5px">
                        <img src={icon} alt="" width={width} height={height} />
                    </FlexView>
                    <EntityName style={{ marginLeft: '10px' }}>
                        <Text ellipsis>{name}</Text>
                    </EntityName>
                    <SecondaryInfo>{company}</SecondaryInfo>
                </FlexView>
            );
        });
    }

    return (
        <DataContainer>
            <Wrapper>{content}</Wrapper>
        </DataContainer>
    );
};
export default SearchResult;
