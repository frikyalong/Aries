const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {};
}
module.exports = withBundleAnalyzer(
    withLess(
        withCss(
            withImages({
                lessLoaderOptions: {
                    javascriptEnabled: true,
                },
                analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
                bundleAnalyzerConfig: {
                    server: {
                        analyzerMode: 'static',
                        reportFilename: '../bundles/server.html',
                    },
                    browser: {
                        analyzerMode: 'static',
                        reportFilename: '../bundles/client.html',
                    },
                },
                inlineImageLimit: 1,
                webpack: (config, { isServer }) => {
                    if (isServer) {
                        const antStyles = /antd\/.*?\/style\/css.*?/;
                        const origExternals = [...config.externals];
                        config.externals = [
                            // eslint-disable-line
                            (context, request, callback) => {
                                // eslint-disable-line
                                if (request.match(antStyles)) return callback();
                                if (typeof origExternals[0] === 'function') {
                                    origExternals[0](context, request, callback);
                                } else {
                                    callback();
                                }
                            },
                            ...(typeof origExternals[0] === 'function'
                                ? []
                                : origExternals),
                        ];

                        config.module.rules.unshift({
                            test: antStyles,
                            use: 'null-loader',
                        });
                    }
                    return config;
                },
            })
        )
    )
);
