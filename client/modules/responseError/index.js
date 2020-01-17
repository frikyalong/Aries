// @flow strict

export class RedirectError extends Error {}

export class NotFoundError extends Error {}

export class APIError extends Error {
    body;

    constructor(message, body) {
        super(message);
        this.body = body;
    }
}

export const shouldIgnoreError = err =>
    err instanceof RedirectError || err instanceof NotFoundError;

export const MAX_LOG_DATA_SIZE = 10000;
export const truncateLogContent = msg => {
    if (typeof msg === 'string') {
        return msg.slice(0, MAX_LOG_DATA_SIZE);
    }
    return undefined;
};
