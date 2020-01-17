// @flow strict
import _ from 'lodash';
import urlParse from 'url-parse';

const isCurrent = ({ href, linkAs, pattern = [] }, current) => {
    if (!current || !href) {
        return false;
    }

    const { pathname } = urlParse(current);
    if (pattern.length) {
        return pattern.some(p => new RegExp(p, 'ig').test(pathname));
    }

    return _.trimEnd(pathname, '/') === _.trimEnd(linkAs || href, '/');
};

export default isCurrent;
