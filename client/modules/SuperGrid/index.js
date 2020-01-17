import { useState, useMemo, useContext, useEffect, useRef, useCallback } from 'react';
import _ from 'lodash';
import { useUser } from '/modules/user';
import {
    mergeQueries,
    getEmptyData,
    getEmptyQuery,
    getDataModelsFromQuery,
    convertPartialToFullQuery,
    compareQueries,
} from '/modules/query-language/query';
import processQuery from '/ajax/v2/query';

export function useDatasource(
    { name, parents = [], capacity, syncToUrl = true, persistsBetweenSessions = [] },
    initialParams
) {
    const user = useUser();
    const parentsState = getEmptyQuery();
    const baseState = mergeQueries(parentsState, initialParams);
    const [{ resp, respQuery }, setResp] = useState({
        resp: getEmptyData(),
        respQuery: getEmptyQuery(),
    });
    const dataModels = {};
    const [dataRefreshDelay, setForce] = useState(Promise.resolve());

    // Every time the query is regenerated, reset the active status to false.
    const activeStatus = useRef(false);
    activeStatus.current = false;

    // Store the parents on a ref to prevents re-generating our functions every time
    // they change.
    const parentsRef = useRef(parents);
    parentsRef.current = parents;

    const isMounted = useRef(true);
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // This cache is invariable and changes will NOT trigger a re-render. Keep this in
    // mind when deciding if you should store data in the datasource cache or the state.
    const loadingQuery = useRef();
    const prevQuery = useRef(getEmptyQuery());
    const listeners = useRef(new Set());

    // We can memoize many data methods because we recreate the object every time something
    // changes. So each instance of the datasource only need to process most functions once.
    const getQuery = () => {
        const mergedQuery = mergeQueries(baseState, {});

        const fullQuery = convertPartialToFullQuery(mergedQuery);

        if (!_.isEqual(fullQuery, prevQuery.current)) {
            prevQuery.current = fullQuery;
        }

        return prevQuery.current;
    };

    const query = getQuery();

    const getLoadingStatus = useCallback(
        _.once(() => {
            const currentDataModels = getDataModelsFromQuery(query);
            const hasUnknownDataModels = currentDataModels.some(
                model => !dataModels[model]
            );
            const { isQueriesCompatible } = compareQueries(query, respQuery);
            return [isQueriesCompatible, hasUnknownDataModels];
        }),
        [query, dataModels, respQuery]
    );

    const isLoading = useCallback(
        ({ waitForDataModels } = {}) => {
            const [isQueriesCompatible, hasUnknownDataModels] = getLoadingStatus();
            return (
                (waitForDataModels !== false && hasUnknownDataModels) ||
                !isQueriesCompatible
            );
        },
        [getLoadingStatus]
    );

    const hasError = useCallback(
        _.once(() => {
            const { data, errors } = resp;
            return (
                !isLoading({ waitForDataModels: false }) &&
                data.facets.length === 0 &&
                errors.length > 0
            );
        }),
        [isLoading, resp]
    );

    const getResponse = useMemo(() => {
        async function fetchResponse(newQuery) {
            loadingQuery.current = newQuery;
            await dataRefreshDelay;
            let response;
            try {
                response = await processQuery(newQuery, name);
            } catch (err) {
                response = {
                    ...getEmptyData(),
                    errors: [
                        {
                            message: 'Unknown network failure caught on the browser',
                        },
                    ],
                };
            }
            let isQueriesCompatible = false;

            if (loadingQuery.current) {
                isQueriesCompatible = compareQueries(loadingQuery.current, newQuery)
                    .isQueriesCompatible;
            }
            if (isMounted.current && isQueriesCompatible) {
                setResp({ resp: response, respQuery: newQuery });
                loadingQuery.current = undefined;
            }
        }

        const doGetResponse = _.once(() => {
            fetchResponse(query);
            return resp;
        });

        return () => {
            return doGetResponse();
        };
    }, [dataRefreshDelay, query, hasError, name, processQuery, resp, respQuery]);
    const datasource = useMemo(
        () => ({
            toString() {
                return name;
            },
            getQuery() {
                return query;
            },
            getResponse,
            isLoading,
            hasError,
        }),
        [getResponse, isLoading, hasError, name, query]
    );

    return datasource;
}
