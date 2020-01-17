// @flow strict
import * as React from 'react';

export const defaultUserContext = {
    id: -1,
    surveyLastName: '',
    surveyFirstName: '',
    superAdminName: '',
    superAdminEmail: '',
    email: '',
    isAnUser: false,
    isIntUser: false,
    isInactiveIntUser: false,
    isImpersonate: false,
    hasFileReportsOrTableau: false,
    companyMetricBundles: {},
    purchasedCountries: {},
    intFeatures: {},
    whitelist: {},
    isIpFromChina: false,
    gpCategories: [],
    iosCategories: [],
    unifiedCategories: [],
};

const UserContext = React.createContext({
    user: defaultUserContext,
});

export function useUser() {
    const { user } = React.useContext(UserContext);
    return user;
}

export function withUser(Component) {
    const name = Component.displayName || Component.name || 'Component';

    class Wrapper extends React.Component {
        static contextType = UserContext;

        static displayName = `withUser(${name})`;

        render() {
            const { user } = this.context;
            return <Component {...this.props} user={user} />;
        }
    }

    return Wrapper;
}

export default UserContext;
