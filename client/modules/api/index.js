// @flow strict
import { useState, useEffect, useRef } from 'react';

export const useAPI = (apiFunction, ignoreOnMount, ...args) => {
    type State = {
        resp?: ResponseValue,
        isLoading: boolean,
        error?: Error,
    };

    const isInitialMount = useRef(ignoreOnMount);
    const loadingState = { isLoading: true };
    const [state, updateState] = useState<State>(loadingState);

    useEffect(
        () => {
            let ignoreResult = false;

            if (isInitialMount.current) {
                isInitialMount.current = false;
            } else {
                if (!state.isLoading) {
                    updateState(loadingState);
                }

                apiFunction(...args).then(
                    (resp: ResponseValue) => {
                        if (!ignoreResult) {
                            updateState({ resp, isLoading: false });
                        }
                    },
                    error => {
                        if (!ignoreResult) {
                            updateState({ error, isLoading: false });
                        }
                    }
                );
            }
            return () => {
                ignoreResult = true;
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [apiFunction, ...args]
    );

    return [state.resp, state.isLoading, state.error];
};
