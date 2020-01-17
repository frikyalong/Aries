import * as api from '/ajax/api';

const create = ({
    id,
    title,
    content,
    category,
    url,
    permissions,
    published,
    published_at,
}) => {
    const request_url = '/ajax/v2/generic-group/create';
    // const url = '/ajax/v2/notification/create';
    const reqMeta = {
        method: 'post',
        body: {
            id,
            title,
            content,
            category,
            url,
            permissions,
            published,
            published_at,
        },
    };
    return api
        .authFetch(request_url, reqMeta)
        .then(api.checkStatus)
        .then(res => api.v2ParseJSON(res, reqMeta))
        .then(
            res => res.data[0].id,
            error => {
                throw error;
            }
        );
};

export default create;
