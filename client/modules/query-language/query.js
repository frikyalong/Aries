import _ from 'lodash';

export const getEmptyData = () => ({
    data: {
        facets: [],
        dimensions: {},
    },
    pagination: {},
    order_by: [],
    errors: [],
});

export const getEmptyQuery = () => ({
    facets: [],
    filters: {},
    breakdowns: {},
});

export const mergeQueries = (...args) => {
    const queries = args.filter(Boolean);

    // Allow to set pagination to null to reset it.
    let paginationParams = queries.map(({ pagination }) => pagination);
    paginationParams = paginationParams.slice(
        Math.max(0, paginationParams.lastIndexOf(null))
    );

    const mergedQueries = Object.assign({}, ...queries, {
        filters: queries
            .map(({ filters }) => filters)
            .reduce((mergedFilters, currentFilters) => {
                if (currentFilters) {
                    Object.keys(currentFilters).forEach(key => {
                        const mergedFilter = _.get(mergedFilters, key);
                        const currentFilter = _.get(currentFilters, key);
                        const [operator] = Object.keys(currentFilter || {});
                        /* eslint-disable no-param-reassign */
                        if (
                            ['in', 'contains'].includes(operator) &&
                            mergedFilter &&
                            mergedFilter[operator] &&
                            typeof mergedFilter[operator] === 'object' &&
                            !Array.isArray(mergedFilter[operator]) &&
                            mergedFilter[operator].search == null &&
                            currentFilter &&
                            currentFilter[operator] &&
                            typeof currentFilter[operator] === 'object' &&
                            !Array.isArray(currentFilter[operator]) &&
                            currentFilter[operator].search == null
                        ) {
                            mergedFilters[key] = {
                                // $FlowFixMe
                                [operator]: mergeQueries(
                                    mergedFilter[operator],
                                    currentFilter[operator]
                                ),
                            };
                        } else {
                            mergedFilters[key] = currentFilter;
                        }
                        /* eslint-enable no-param-reassign */
                    });
                }
                return mergedFilters;
            }, {}),
        breakdowns: Object.assign({}, ...queries.map(({ breakdowns }) => breakdowns)),
        pagination: Object.assign({}, ...paginationParams),
        report_parameters: Object.assign(
            {},
            // eslint-disable-next-line
            ...queries.map(({ report_parameters }) => report_parameters)
        ),
        ..._.pick(Object.assign({}, ...queries), 'localization'),
    });

    // Remove top-level sections who're empty to keep the url clean, but maintain the null values
    // to allow parent query overwrites.
    return _.pickBy(
        mergedQueries,
        val =>
            val &&
            (Array.isArray(val) || typeof val === 'string' || Object.keys(val).length > 0)
    );
};

export const recursivelyFlatFields = (fields, node, options = { hoistModels: true }) => {
    if (Array.isArray(fields)) {
        return fields;
    }
    const lastKey = node[node.length - 1];
    const _fields = fields;
    return Object.keys(fields).reduce((memo, key) => {
        const fieldValue = _fields[key];
        if (Array.isArray(fieldValue)) {
            fieldValue.forEach(field => {
                if (lastKey !== field) {
                    memo.push(node.concat(field).join('.'));
                    if (options.hoistModels) {
                        // Always fetch top level dimension models as well,
                        // so the report owner could choose to use either the nested data model or the top level
                        memo.push(field);
                    }
                }
            });
        } else if (fieldValue && lastKey !== key) {
            let currentPath = node.concat(key);
            // Add root node
            if (node.length === 0) {
                currentPath = [key];
                memo.push(key);
            }
            // Recursively add sub node key
            const recursivePath = recursivelyFlatFields(fieldValue, currentPath, options);
            memo.push(...recursivePath);
        }
        return memo;
    }, []);
};

export const getDataModelsFromQuery = (query, options) => {
    const { breakdowns } = query;

    const facets = _.flatten([
        ...query.facets.map(facet => {
            if (typeof facet === 'string') {
                return [facet];
            }
            return getDataModelsFromQuery(facet, options);
        }),
    ]);

    const fields = query.fields || [];
    const isValidField = key => query.breakdowns[key] || facets.includes(key);

    let validFields;
    if (Array.isArray(fields)) {
        validFields = fields.filter(isValidField);
    } else {
        validFields = Object.keys(fields).reduce((memo, key) => {
            if (isValidField(key)) {
                // eslint-disable-next-line no-param-reassign
                memo[key] = fields[key];
            }
            return memo;
        }, {});
    }
    const flatFields = recursivelyFlatFields(validFields, [], options);

    return _.uniq([...Object.keys(breakdowns), ...flatFields, ...facets]);
};

const isNotEmpty = val =>
    val &&
    (Array.isArray(val) || Object.values(val).filter(value => value != null).length);

export const convertPartialToFullQuery = query => {
    const { filters = {} } = query;
    const filtersWithFullSubQuery = Object.keys(filters).reduce((memo, filterKey) => {
        let filter = filters[filterKey];
        const [operator] = Object.keys(filter || {});
        const filterValue = _.get(filter, operator);

        if (['in', 'contains'].includes(operator) && filterValue) {
            if (Array.isArray(filterValue)) {
                filter = {
                    [operator]: filterValue.map(filterItem => {
                        return typeof filterItem === 'object'
                            ? convertPartialToFullQuery(filterItem)
                            : filterItem;
                    }),
                };
            } else if (!filterValue.search) {
                filter = {
                    [operator]: convertPartialToFullQuery(filterValue),
                };
            }
        } else if (operator === 'equal' && typeof filterValue === 'object') {
            filter = {
                equal: convertPartialToFullQuery(filterValue),
            };
        }

        if (isNotEmpty(filter)) {
            // eslint-disable-next-line no-param-reassign
            memo[filterKey] = filter;
        }
        return memo;
    }, {});

    const cleanedQuery = _.pickBy(
        {
            ...query,
            filters: filtersWithFullSubQuery,
            breakdowns: _.omitBy(query.breakdowns || {}, _.isNil),
        },
        isNotEmpty
    );

    return {
        ...getEmptyQuery(),
        ...cleanedQuery,
    };
};

export const createDataGetter = dimensions => (
    queryPath,
    initialQueryObj,
    defaultValue
) => {
    const pathList = queryPath.split('.');
    let path;
    let queryObj = initialQueryObj;
    let queryValue;
    // eslint-disable-next-line no-cond-assign
    while ((path = pathList.shift())) {
        const value = _.get(queryObj, path);
        if (pathList.length === 0 && value !== undefined) {
            queryValue = value;
            break;
        }

        if (value == null) {
            break;
        }

        const dimension = _.get(dimensions, path.match(/[^[]+/));
        if (dimension && _.get(dimension, value)) {
            queryObj = _.get(dimension, value);
        } else {
            break;
        }
    }

    if (queryValue !== undefined) {
        return queryValue;
    }

    return defaultValue;
};

const isEmptyQuery = query =>
    query.facets.length === 0 ||
    query.facets.every(facet => typeof facet === 'object' && isEmptyQuery(facet)) ||
    Object.keys(query.breakdowns).some(breakdown => {
        const rule = query.filters[breakdown];
        if (rule && Array.isArray(rule.in)) {
            return rule.in.length === 0;
        }
        return false;
    });

export const compareQueries = (newQuery, oldQuery) => {
    if (isEmptyQuery(newQuery)) {
        return {
            isQueriesCompatible: true,
            filterResponse: getEmptyData,
        };
    }

    if (!oldQuery) {
        return {
            isQueriesCompatible: false,
            filterResponse: _.identity,
        };
    }

    if (_.isEqual(newQuery, oldQuery)) {
        return {
            isQueriesCompatible: true,
            filterResponse: _.identity,
        };
    }
    return {
        isQueriesCompatible: false,
        filterResponse: _.identity,
    };
};
