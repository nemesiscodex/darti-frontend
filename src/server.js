const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const { join } = require('path');
const { parse } = require('url');

const nextI18next = require('./i18n');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
    await app.prepare()
    const server = express();

    server.use(nextI18NextMiddleware(nextI18next));

    server.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        // handle GET request to /service-worker.js
        if (pathname.endsWith('/service-worker.js') || pathname === '/service-worker.js') {
            const filePath = join('.next', '/service-worker.js');

            return app.serveStatic(req, res, filePath)
        } else {
            return handle(req, res, parsedUrl)
        }

    });


    await server.listen(port);
    console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})();