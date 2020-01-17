import _ from 'lodash';
import { defaultMemoize } from 'reselect';
import * as api from '/ajax/api';
import { notificationFakeData } from '/helpers/table_fake_data';

const getNotifications = (request, response, published, title) => {
    let url = '/ajax/v2/app-group/get-all-groups';
    // let url = '/ajax/v2/notifications/get-all';
    if (published) {
        url = `${url}?${qs.stringify({ published: published })}`;
    }
    if (title) {
        url = `${url}?${qs.stringify({ title: title })}`;
    }
    return api
        .authFetch(
            url,
            {
                method: 'get',
            },
            request
        )
        .then(r => api.checkStatus(r, response, request))
        .then(api.v2ParseJSON)
        .then(r => {
            return notificationFakeData;
        });
};

export default getNotifications;
