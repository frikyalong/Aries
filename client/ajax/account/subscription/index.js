// @flow strict
import * as api from '/ajax/api';

const convertItems = ({ name, is_locked }) => ({
    label: name,
    isLocked: Boolean(is_locked),
});

const fetchSubscription = (req, res) =>
    api
        .authFetch('/ajax/account/subscription/', {}, req)
        .then(r => api.checkStatus(r, res, req))
        .then(api.parseJSON)
        .then(r => {
            const { data } = r;
            return {
                accountOwnerEmail: data.account_owner_email,
                isActive: data.is_active,
                customerName: data.customer_name,
                lastSyncUp: data.last_sync_up,
                startDate: data.data_start_date,
                endDate: data.data_end_date,
                basicUserCount: data.basic_user_count,
                advancedUserCount: data.advanced_user_count,
                hasWebAccess: data.has_web_access,
                hasApiAccess: data.has_api_access,
                hasCsvExport: data.has_csv_export,
                monthlyApiCalls: data.monthly_api_calls,
                hasIpRestrictions: data.has_ip_restrictions,
                // countries: data.countries.filter(c => !c.is_locked).map(convertItems),
                // categories: data.categories.filter(c => !c.is_locked).map(convertItems),
            };
        });

export default fetchSubscription;
