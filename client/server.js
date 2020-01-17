// @noflow
/* eslint-disable global-require, no-console, no-param-reassign */

const { PORT = 3000, SECURE_PORT = 3444 } = process.env;

const uuid = require('uuid');
const url = require('url');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const next = require('next');
const express = require('express');
const compression = require('compression');
const {
    dev,
    logger,
    baseMeta,
    winstonLogger,
    winstonErrorLogger,
} = require('./server/logger');

function rewriteReferer(proxyReq, req) {
    const origin = 'https://www.appannie.com';
    const parsedUrl = url.parse(req.headers.referer || origin);
    proxyReq.setHeader('referer', `${origin}${parsedUrl.path}`);
}

const app = next({ dev });
const handle = app.getRequestHandler();

const AVAILABLE_URL_LIST = [
    {
        url: '/admin/monitoring/dashboard',
        route: '/admin/monitoring/dashboard',
    },
    {
        url: '/admin/site/notifications',
        route: '/admin/site/notifications',
    },
    {
        url: '/_admin/auth',
        route: '/_admin/auth',
    },
    {
        url: '/demo/blank_page',
        route: '/demo/blank_page',
    },
    {
        url: '/demo/feedback',
        route: '/demo/feedback',
    },
    {
        url: '/demo/ui',
        route: '/demo/ui',
    },
    {
        url: '/demo/form',
        route: '/demo/form',
    },
    {
        url: '/demo/search',
        route: '/demo/search',
    },
    {
        url: '/demo/chart',
        route: '/demo/chart',
    },
    {
        url: '/demo/table',
        route: '/demo/table',
    },
    {
        url: '/demo/data-flow',
        route: '/demo/data-flow',
    },
];

const AVAILABLE_POST_URL_LIST = [];

app.prepare().then(() => {
    const server = express();
    server.disable('x-powered-by');

    // setup logger before other plugins
    server.use(winstonLogger);

    // Enable gzip for text based assets
    server.use(compression());

    // Set default headers we want to add to every requests.
    server.use((req, res, carryOn) => {
        // Disable IE broken XSS protection
        res.setHeader('X-XSS-Protection', '0');

        carryOn();
    });

    // For tracing purposes, this middleware handle 2 headers.
    // Documentation: https://docs.google.com/document/d/1lxyIYk759m_XMlh9yI5XYFNiGaUqiHjH9pJEWIja6wc
    server.use((req, res, carryOn) => {
        const reqId = req.header('aa-request-id') || uuid.v4();
        let seqId = req.header('aa-sequence-id') || '';
        seqId = `${seqId}1000`;

        // Set the aa-request-id on the response so we can track it from the client.
        res.setHeader('aa-request-id', reqId);

        // Set keys on the request object so we can use them when calling other services.
        req.req_id = reqId;
        req.seq_id = parseInt(seqId, 10);

        carryOn();
    });

    /**
     * Next steps is setting up our routing logic
     */

    // Rewrite the /next_static/ requests to /static/
    server.use(
        '/next_static',
        express.static(path.join(__dirname, '/static'), {
            maxAge: '365d',
        })
    );

    const TRAILING_SLASH_EXTENSION = /\/\.js$/;
    server.use('/_next', (req, res, carryOn) => {
        req.url = req.url.replace(TRAILING_SLASH_EXTENSION, '.js');
        carryOn();
    });

    AVAILABLE_URL_LIST.forEach(page =>
        server.get(page.url, (req, res) => {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = url.parse(req.url, true);
            const mergedQuery = { ...req.params, ...parsedUrl.query };
            app.render(req, res, page.route, mergedQuery);
        })
    );

    AVAILABLE_POST_URL_LIST.forEach(page =>
        server.post(
            page.url,
            bodyParser.urlencoded({ extended: true, limit: '20000kb' }),
            (req, res) => {
                // Be sure to pass `true` as the second argument to `url.parse`.
                // This tells it to parse the query portion of the URL.
                const parsedUrl = url.parse(req.url, true);
                const mergedQuery = { ...req.params, ...parsedUrl.query };
                app.render(req, res, page.route, mergedQuery);
            }
        )
    );

    server.get('/_next/**', (req, res) => handle(req, res));

    if (process.env.API_V2_SERVER) {
        server.use(
            '/ajax/v2',
            proxy({
                target: process.env.API_V2_SERVER,
                changeOrigin: true,
                autoRewrite: true,
                cookieDomainRewrite: '',
                pathRewrite: {
                    // For API v2, we need to rewrite the path from /ajax/v2/ to /v2/
                    '^/ajax/v2': '/v2',
                },
                onProxyReq: rewriteReferer,
            })
        );
    }

    if (process.env.AA_DJANGO_SERVER) {
        server.use(
            '*',
            proxy({
                target: process.env.AA_DJANGO_SERVER,
                changeOrigin: true,
                autoRewrite: true,
                cookieDomainRewrite: '',
                onProxyReq: rewriteReferer,
            })
        );
    }

    server.use(winstonErrorLogger);
    // in dev mode, also run a self-signed HTTPS server to copy production behavior
    if (dev || process.env.MOCK_PRODUCTION === 'true') {
        const credentials = {
            key: fs.readFileSync('server/conf/ssl-dev.unsafe-key', 'utf8'),
            cert: fs.readFileSync('server/conf/ssl-dev.unsafe-pem', 'utf8'),
        };
        https.createServer(credentials, server).listen(SECURE_PORT);
    }

    http.createServer(server).listen(PORT, err => {
        if (err) throw err;
        logger.info('> Mode', process.env.NODE_ENV);
        logger.info('> Log level', process.env.LOG_LEVEL);
        logger.info('> Proxy on');
        logger.info('  AA Django', String(process.env.AA_DJANGO_SERVER));
        logger.info('  API V2', String(process.env.API_V2_SERVER));
        logger.info(`> Next service running at http://localhost:${PORT}`);
        logger.info(`dev: ${dev}`);
        if (dev) {
            logger.info(
                `> Secure server running at https://localhost:${SECURE_PORT}/admin/monitoring/dashboard`
            );
        }
    });
});
