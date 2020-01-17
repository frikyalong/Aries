// @flow strict
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import cdn from '/modules/cdn';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link
                        rel="apple-touch-icon-precomposed"
                        href={cdn('/next_static/favicon-60.png')}
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href={cdn('/next_static/favicon.png')}
                    />
                    <link
                        rel="preload"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                        href={cdn(
                            '/next_static/fonts/ProximaNova/ProximaNova-Regular.woff'
                        )}
                    />
                    <link
                        rel="preload"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                        href={cdn('/next_static/fonts/ProximaNova/ProximaNova-Bold.woff')}
                    />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
