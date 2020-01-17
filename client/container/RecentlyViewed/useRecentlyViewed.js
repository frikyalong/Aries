// @flow strict
import { useDatasource } from '/modules/SuperGrid';

const useRecentlyViewed = () =>
    useDatasource(
        {
            name: 'recently_viewed',
            capacity: {
                mode: 'ignore',
                filters: {},
                facets: [],
            },
            syncToUrl: false,
        },
        {
            facets: ['user_recently_viewed_unified_product_rank__aggr'],
            breakdowns: {
                unified_product_id: {},
            },
            pagination: {
                offset: 0,
                limit: 12,
            },
            order_by: [
                {
                    name: 'user_recently_viewed_unified_product_rank__aggr',
                    order: 'asc',
                },
            ],
            fields: {
                unified_product_id: {
                    company_id: {
                        fields: ['name', 'country_code'],
                    },
                    fields: [
                        'name',
                        'icon_url',
                        'company_id',
                        'market_code',
                        'device_code',
                        'is_sensitive',
                        'vertical_code',
                    ],
                },
            },
        }
    );

export default useRecentlyViewed;
