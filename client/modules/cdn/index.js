// @flow strict
import qs from 'qs';
import getConfig from 'next/config';

// add CDN prefix
export default url => {
    // fallback for storybook
    const { publicRuntimeConfig = {} } = getConfig() || {};

    const cdn = publicRuntimeConfig.cdnUrl || '';

    // add VERSION suffix
    if (publicRuntimeConfig.version) {
        const [urlPath, urlQueryString = ''] = url.split('?');
        const queryString = qs.parse(urlQueryString);
        queryString.v = publicRuntimeConfig.version;
        return `${cdn}${urlPath}?${qs.stringify(queryString)}`;
    }

    return `${cdn}${url}`;
};
