import App from 'next/app';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import { IconContext } from 'react-icons';
import themes from '/config/theme/theme.config';
import NProgress from 'next-nprogress/component';
import GlobalStyle from '/components/style/global';
import Fonts from '/components/style/fonts';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {},
        };
    }
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Normalize />
                <GlobalStyle />
                <Fonts />
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                    <ThemeProvider theme={themes['defaultTheme']}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </IconContext.Provider>
                <NProgress spinner={false} />
            </>
        );
    }
}
export default MyApp;
