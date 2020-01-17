// @flow strict
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import fetchUser from '../../ajax/user/info';
import { isResponseSent, redirectTo } from '../../ajax/api';
import return404 from '../response/404';
import UserContext from '../user';

export default function withAAContext(
    WrappedComponent,
    { allowAccess, fallbackPage } = {}
) {
    const getInitialProps =
        typeof WrappedComponent.getInitialProps === 'function'
            ? WrappedComponent.getInitialProps
            : () => Promise.resolve({});

    class AAPage extends React.Component {
        static WrappedComponent = WrappedComponent;

        static async getInitialProps(ctx) {
            const { res, req } = ctx;

            let props;
            let user;
            try {
                [props, user] = await Promise.all([
                    getInitialProps(ctx),
                    fetchUser(req, res),
                ]);
                if (allowAccess && !allowAccess(user, props)) {
                    if (fallbackPage) {
                        redirectTo(fallbackPage, res);
                    } else {
                        return404(res);
                    }
                }
            } catch (err) {
                // If response is sent, then we can ignore what happened and just return.
                // Otherwise we need to throw to stop the rendering.
                if (isResponseSent(res)) {
                    return {};
                }

                throw err;
            }

            return { ...props, user };
        }

        render() {
            const { user } = this.props;
            let impersonate;
            if (user && user.isImpersonate) {
                impersonate = <Impersonate userName={user.email} />;
            }

            return (
                <UserContext.Provider value={{ user }}>
                    <div>
                        <WrappedComponent {...this.props} />
                    </div>
                    {impersonate}
                </UserContext.Provider>
            );
        }
    }

    return hoistStatics(AAPage, WrappedComponent, {
        // `getInitialProps` not in hoist static list, so we add it here to prevent override
        getInitialProps: true,
    });
}
