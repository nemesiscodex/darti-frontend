const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const withManifest = require('next-manifest');


const defaults = {
    // next-manifest options
    output: './static/', // The folder where the manifest will be generated.
    // manifest options
    name: 'Darti Web',
    shortName: 'Darti Web',
    startUrl: "/",
    themeColor: '#1f2b38',
    backgroundColor: '#fff',
    icons: [
        {
            "src": "/static/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/static/icons/icon-256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "/static/icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
};

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

module.exports =
    withManifest(
        withOffline(
            withCSS(
                withBundleAnalyzer({
                    publicRuntimeConfig: {
                        BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8888"
                    },
                    manifest: {
                        ...defaults
                    }
                })
            )
        )
    );

