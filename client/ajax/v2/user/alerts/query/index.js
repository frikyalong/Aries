// @flow strict
import qs from 'qs';
import { createSelector } from 'reselect';
import * as api from '/ajax/api';

const getApiUrl = params => `/ajax/v2/user/alerts/query?${qs.stringify(params)}`;

const convertData = data => ({
    id: data.id,
    name: data.name,
    status: Boolean(data.status),
    notifications: data.notifications,
    object_type: data.subscription_object.object_type,
    email_setting: data.notification_settings.email,
    slack_setting: data.notification_settings.slack,
    url: {
        edit: `/account/alerts/edit/?id=${data.id}`,
        duplicate: `/account/alerts/edit/?id=${data.id}&duplicate=true`,
        feed: `/alerts/feed/?alertId=${data.id}`,
    },
    last_triggered_time: data.last_triggered_time
        ? data.last_triggered_time * 1000
        : null,
});

const fetchAlertsForCurrentUser = createSelector(
    [params => params, (params, req) => req, (params, req, res) => res],
    (params, req, res) =>
        api
            .authFetch(
                getApiUrl(params),
                {
                    method: 'post',
                    body: {
                        query: {
                            filters: {},
                            metrics: [
                                'id',
                                'user_id',
                                'name',
                                'status',
                                'notification_settings',
                                'notifications',
                                'last_triggered_time',
                                'created_time',
                                'subscription_object',
                            ],
                            order_by: [params.orderBy, params.orderType],
                        },
                    },
                },
                req
            )
            .then(r => api.checkStatus(r, res, req))
            .then(api.parseJSON)
            .then(r => {
                console.log('$$$$$$$$', r);
                return {
                    params: {
                        limit: r.pagination.limit,
                        offset: r.pagination.offset,
                    },
                    meta: {
                        pageTotal: Math.ceil(r.pagination.total / r.pagination.limit),
                    },
                    data: r.data.map(convertData),
                };
            })
);

export default fetchAlertsForCurrentUser;
