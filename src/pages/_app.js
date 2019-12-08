import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import NProgress from 'nprogress';
import Router from 'next/router';
import { appWithTranslation } from '../i18n'
import Error from 'next/error'

const originalMethod = Error.getInitialProps;
Error.getInitialProps = function(props) {
    return originalMethod({...props, namespacesRequired: ['common']})
};

Router.events.on('routeChangeStart', url => {
    NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function nprogressCss() {
    return (<style jsx global>{`
    /* Make clicks pass-through */
    #nprogress {
        pointer-events: none;
    }
    
    #nprogress .bar {
        background: #de6385;
    
        position: fixed;
        z-index: 1300;
        top: 0;
        left: 0;
    
        width: 100%;
        height: 3px;
    }
    
    /* Fancy blur effect */
    #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #fff, 0 0 5px #fff;
        opacity: 1;
    
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
    }`}</style>)
}

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <meta
                        name="description"
                        content="Darti Web"
                    />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="apple-touch-icon" href="/static/icons/icon-57.png"/>
                    <link rel="manifest" href="/static/manifest.json" />
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link rel="stylesheet" href="/static/css/leaflet.css" />
                    <title>Darti Web</title>
                    {nprogressCss()}
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component namespacesRequired={['common']} {...pageProps} />
                </ThemeProvider>
            </>
        );
    }
}

export default appWithTranslation(MyApp)