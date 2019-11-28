const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

// TODO: Remove when https cert is available
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

module.exports = withBundleAnalyzer({});

