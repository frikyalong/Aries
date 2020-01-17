// @flow strict
import fetchPonyfill from 'fetch-ponyfill';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import qs from 'qs';
import { isResSent } from 'next-server/dist/lib/utils';
import { RedirectError, APIError, truncateLogContent } from '../modules/responseError';

const { fetch } = fetchPonyfill();

const requiredHeaders = /^(user-agent|accept-language|x-forwarded-for|cookie|authorization|x-aa-)/gi;

const withDomain = (path, prependDomain) => {
    if (!prependDomain) {
        return path;
    }
    const domain = process.env.PROXY_SERVER;
    return `${domain}${path}`;
};

const getCurrentUrl = request => {
    let url;
    if (request) {
        url = request.originalUrl || '';
    } else {
        const loc = global.location;
        url = _.get(loc, 'pathname', '') + _.get(loc, 'search', '');
    }
    return encodeURIComponent(url);
};

const isResetPasswordError = body => {
    const err = 'FORCE_PASSWORD_RESET';
    try {
        const parseBody = JSON.parse(body);
        // business api Or django ajax call
        return (
            _.get(parseBody, 'errors[0].code') === err ||
            _.get(parseBody, 'message') === err
        );
    } catch (e) {
        return false;
    }
};

const isLoggedOutError = body =>
    // (STOR-1719) Featured apps API returns the logged out response with a 404 status.
    body === '{"reason": "login required"}';

const nextSequenceId = request => {
    // Bump the sequence ID
    if (request.seq_id) {
        request.seq_id += 1;
    } else {
        request.seq_id = 1000;
    }
    return request.seq_id;
};
export const redirectTo = (redirectUrl, userResponse) => {
    if (userResponse) {
        userResponse.writeHead(302, { Location: redirectUrl });
        // Calling `res.end()` would stop Nextjs rendering page/components
        userResponse.end();
    } else {
        global.window.location = redirectUrl;
    }
    throw new RedirectError(
        JSON.stringify({
            title: 'Redirect',
            thrower: 'api.redirectTo',
            redirectUrl,
        })
    );
};

const requestAuthentication = (userResponse, request) => {
    // Here we'll send the user to the login page. Make sure we delete the aa_user_token before
    // doing so to make sure the user will be asked to log in again. If we don't, we might send
    // the user in an infinite loop if different services consider the user in a different state.
    if (userResponse) {
        let next = '';
        if (request) {
            next = `?next=${encodeURIComponent(request.url)}`;
        }
        userResponse.setHeader(
            'Set-Cookie',
            'aa_user_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        );
        const redirectUrl = `/account/login/${next}`;
        userResponse.writeHead(302, {
            Location: redirectUrl,
        });
        userResponse.end();

        throw new RedirectError(
            JSON.stringify({
                title: 'Redirect',
                thrower: 'api.requestAuthentication',
                redirectUrl,
            })
        );
    } else {
        const cookies = new Cookies();
        cookies.remove('aa_user_token');
        const returnUrl = getCurrentUrl(request);
        redirectTo(`/account/login/?next=${returnUrl}`);
    }
};

const crossOriginFetch = (path, body) =>
    fetch(path, {
        method: 'post',
        mode: 'cors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body,
    });

const authFetch = (path, options, request) => {
    const cookies = new Cookies(request ? request.headers.cookie || '' : undefined);

    let headers = { method: 'post' };

    if (request) {
        headers = _.pickBy(request.headers, (val, key) => key.match(requiredHeaders));
        headers.referer = `https://www.appannie.com${request.url}`;
        headers['aa-sequence-id'] = nextSequenceId(request);
        headers['aa-request-id'] = request.req_id;
    }

    const fullOptions = {
        headers: {},
        ...options,
    };

    headers = {
        ...headers,
        'content-type': 'application/json',
        accept: 'application/json, text/plain, */*',
        'x-requested-with': 'XMLHttpRequest',
        'x-csrftoken': cookies.get('csrftoken'),
        ...fullOptions.headers,
    };

    headers = _.omitBy(headers, _.isUndefined);

    if (
        fullOptions.body &&
        typeof fullOptions.body !== 'string' &&
        headers['content-type'] === 'application/json'
    ) {
        fullOptions.body = JSON.stringify(fullOptions.body);
    }
    return fetch(withDomain(path, request != null), {
        credentials: 'same-origin',
        // Set a default timeout of 2 seconds
        timeout: parseInt(process.env.DEFAULT_TIMEOUT, 10) || 2000,
        ...fullOptions,
        headers,
    });
};

const privateHeaders = ['cookie', 'set-cookie', 'authorization'];
export const getSafeHeaders = headers => {
    const headersObj = {};
    const loopHeaders = (val, key) => {
        if (privateHeaders.includes(key)) {
            headersObj[key] = '[redacted]';
        } else {
            headersObj[key] = val;
        }
    };
    // headers is Symbol(map), should convert to object to normal log it
    if (headers) {
        // If it's normal headers object, use _.forEach to loop
        if (!headers.forEach) {
            _.forEach(headers, loopHeaders);
            return headersObj;
        }
        // If it's Headers Object, the _.forEach doesn't work for it
        // Should call its build-in method `forEach` to loop the key/val
        headers.forEach(loopHeaders);
        return headersObj;
    }

    return headersObj;
};

const checkStatus = (res, userResponse, request) => {
    if (res.ok) {
        return res;
    }

    // If we already sent the request (simultaneous async fetch), then we just noop.
    if (userResponse && userResponse.finished) {
        throw new RedirectError(
            JSON.stringify({
                title: 'ResponseAborting',
                information: 'Response is already sent. Aborting.',
                thrower: 'api.checkStatus',
            })
        );
    }

    // 401 means the user is logged out, redirect him to login page.
    if (res.status === 401) {
        requestAuthentication(userResponse, request);
    }

    // When rendering on server side, there's some status from our APIs we wish to proxy directly
    // to the user:
    // - 403 and x-blocked-by: user is a scraper
    // - 428: User is being temporary blacklisted
    // - 429: User is being rate-limited
    if (res.status === 403 && res.headers.get('x-blocked-by') === 'anti-scraper') {
        redirectTo('/account/login/?_ref=bl', userResponse);
    } else if (res.status === 428) {
        const returnUrl = getCurrentUrl(request);
        redirectTo(`/areyouhuman/?return_to=${returnUrl}`, userResponse);
    } else if (res.status === 429 && userResponse) {
        userResponse.writeHead(429);
        userResponse.end();
    }

    return res.text().then(body => {
        if (res.status === 403) {
            // - 403 and body error is FORCE_PASSWORD_RESET
            if (isResetPasswordError(body)) {
                redirectTo('/account/password-reset/', userResponse);
            }
            // For scheduled email bot 403 error
            if (
                body.includes(
                    '"You are requesting from an IP address that is not associated with your account."'
                )
            ) {
                redirectTo('/account/login/?_ref=bl', userResponse);
            }
        }

        if (isLoggedOutError(body)) {
            requestAuthentication(userResponse, request);
        }

        const headersObj = getSafeHeaders(res.headers);
        const errorMsg = JSON.stringify({
            title: 'Fetch error',
            thrower: 'api.checkStatus',
            url: res.url,
            status: res.status,
            statusText: res.statusText,
            body: truncateLogContent(body),
            headers: headersObj,
        });
        throw new APIError(errorMsg, body);
    });
};

const parseJSON = res => res.json();

const v2ParseJSON = (res, params) => {
    const { url, status, statusText, headers } = res;
    const headersObj = getSafeHeaders(headers);
    return res.json().then(content => {
        if (content.errors && content.errors.length > 0) {
            const body = JSON.stringify(content.errors);
            const errorMsg = JSON.stringify({
                title: 'v2ParseJSON error',
                thrower: 'api.v2ParseJSON',
                url,
                status,
                statusText,
                params,
                body: truncateLogContent(body),
                headers: headersObj,
            });
            throw new APIError(errorMsg, body);
        }
        return content;
    });
};

const checkLoginStatus = (res, userResponse, request) => {
    if (res.status === 200) {
        let next;
        if (request) {
            next = _.get(request, 'query.next');
        } else {
            next = qs.parse(global.window.location.search.slice(1)).next;
        }

        if (!next) {
            next = '/dashboard/home/';
        }

        redirectTo(next, userResponse);
    }

    return res;
};

const isResponseSent = res => {
    if (res) {
        return isResSent(res);
    }
    return false;
};

export {
    crossOriginFetch,
    authFetch,
    checkStatus,
    parseJSON,
    v2ParseJSON,
    isResetPasswordError,
    nextSequenceId,
    checkLoginStatus,
    isResponseSent,
};
