// @flow strict
import _ from 'lodash';
import { defaultMemoize } from 'reselect';
import * as api from '/ajax/api';

const USER_INFO_API = '/ajax/user/info/';

const fillDefault = data => ({
    ...data,
    profile: data.profile || {},
    int_features: data.int_features || {},
    int_customer_profile: data.int_customer_profile || {},
    int_user_profile: data.int_user_profile || {},
    company_super_admin_info: data.company_super_admin_info || {},
    whitelist: data.whitelist || {},
});

const mapResultDataObject = apiData => {
    const data = fillDefault(apiData);
    const { country_codes: purchasedCountries = {} } = data.int_customer_profile;

    return {
        id: parseFloat(data.profile.id),
        isAnUser: Boolean(data.is_an_user),
        isIntUser: Boolean(data.is_int_web_user),
        isInactiveIntUser: Boolean(data.is_subscription_inactive),
        isIntSuperAdmin: Boolean(data.int_user_profile.is_int_super_admin),
        isIntAdmin: Boolean(data.int_user_profile.is_int_admin),
        isSSOAdmin: Boolean(data.is_sso_admin),
        isIntTrialUser: Boolean(data.int_user_profile.is_int_trial_user),
        isIntApiUser: Boolean(data.is_int_api_user),
        isIpFromChina: Boolean(data.is_ip_from_china),
        isFreeUser: Boolean(data.is_free_user),
        isToBeInvitedUser: Boolean(data.is_to_be_invited_user),
        isBasicUser: Boolean(data.int_user_profile.is_basic),
        isAdvancedUser: Boolean(data.int_user_profile.is_advanced),
        surveyLastName: data.profile.survey_name || '',
        surveyFirstName: data.profile.survey_firstname || '',
        email: data.profile.email || '',
        isEmailVerified: data.profile.email_verified,
        isApiPartner: Boolean(data.profile.is_api_partner),
        isAAEmployee: Boolean(data.profile.is_aa_employee),
        activationTime: data.profile.activation_time || '',
        jobFunction: data.profile.survey_job_function || '',
        registrationDate: data.profile.date_joined || '',
        accountOwnerEmail: data.int_customer_profile.account_owner_email,
        superAdminEmail: data.company_super_admin_info.email || '',
        superAdminName: data.company_super_admin_info.name || '',
        whitelist: data.whitelist,
        isImpersonate: Boolean(data.is_impersonate),
    };
};

const fetchUser = defaultMemoize((req, res) =>
    api
        .authFetch(USER_INFO_API, {}, req)
        .then(r => api.checkStatus(r, res, req))
        .then(api.parseJSON)
        .then(r => mapResultDataObject(r))
        .then(user => {
            if (!user.isEmailVerified) {
                api.redirectTo('/account/verify-email', res);
            }
            return user;
        })
);

const checkLogin = defaultMemoize((req, res) =>
    api.authFetch(USER_INFO_API, {}, req).then(r => api.checkLoginStatus(r, res, req))
);

export default fetchUser;
export { checkLogin };
