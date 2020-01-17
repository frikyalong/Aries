import * as api from '/ajax/api';

const deleteNotification = id => {
    const url = '/ajax/v2/generic-group/delete';
    // const url = '/ajax/v2/notification/delete';
    return api
        .authFetch(url, {
            method: 'post',
            body: {
                id,
            },
        })
        .then(api.checkStatus)
        .then(api.parseJSON);
};

export default deleteNotification;
