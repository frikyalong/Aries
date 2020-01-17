// @flow strict
import qs from 'qs';
import _ from 'lodash';
import * as api from '/ajax/api';

const enforceResponseFormat = resp => ({
    pagination: {},
    order_by: [],
    errors: [],
    ...resp,
    data: {
        facets: [],
        dimensions: {},
        ...resp.data,
    },
});

const processQuery = (query, name, req, res, debug = false, url = '/ajax/v2/query') => {
    // Remove empty objects from the query to pass the Business API validation
    const cleanedQuery = _.pickBy(query, value => !_.isEmpty(value));

    return api
        .authFetch(
            `${url}?${qs.stringify({ query_identifier: name })}`,
            {
                method: 'post',
                body: cleanedQuery,
                headers: debug ? { 'dump-debug-info': 'true' } : undefined,
            },
            req
        )
        .then(r => {
            return api.checkStatus(r, res, req);
        })
        .then(async resp => {
            const parsed = await api.parseJSON(resp);
            return {
                ...parsed,
                debug_info: {
                    request_id: resp.headers.get('aa-request-id'),
                    ...parsed.debug_info,
                },
            };
        })
        .then(enforceResponseFormat)
        .catch(error => {
            try {
                const parsedError = JSON.parse(error.body);
                const { errors } = parsedError;
                return enforceResponseFormat({ errors });
            } catch (exception) {
                return enforceResponseFormat({
                    errors: [{ message: String(exception) }],
                });
            }
        });
};

export const processQueryDebug = (query, name, req, res) =>
    processQuery(query, name, req, res, true);

export default processQuery;
