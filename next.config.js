const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const withCSS = require('@zeit/next-css');
// TODO: Remove when https cert is available
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

module.exports = withCSS(withBundleAnalyzer({
    publicRuntimeConfig: {
        BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8888"
    }
}));

