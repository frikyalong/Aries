// @noflow
/* eslint-disable global-require, no-param-reassign */
const os = require('os');
const _ = require('lodash');
const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');
const overrideConsoleError = require('./overrideConsoleError');

const dev = process.env.NODE_ENV !== 'production';

const baseMeta = {
    environment: process.env.NODE_ENV,
    release: process.env.VERSION,
    serverName: os.hostname(),
};
const dynamicMeta = req => ({
    req_id: req.req_id,
    seq_id: req.seq_id,
});

const { printf, simple, colorize, timestamp, json, label } = format;

const reactLogFormat = printf(info => {
    const rawMessage = info.message;
    if (typeof rawMessage === 'string') {
        info.message = {
            body: rawMessage,
        };
    }
    return info;
});

const logFormat = dev
    ? format.combine(simple(), colorize())
    : format.combine(
          label({ label: 'aa-admin-inv-winston' }),
          timestamp(),
          reactLogFormat,
          json()
      );

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'verbose',
    format: logFormat,
    transports: [new transports.Console()],
});

if (!dev) {
    overrideConsoleError(logger, baseMeta.serverName);
}

const redacted = '[REDACTED]';
function redactPrivateRequestData(req, propName) {
    if (propName === 'headers') {
        return _.chain(req)
            .get(propName)
            .cloneDeep()
            .set('cookie', redacted)
            .set('authorization', redacted)
            .set('set-cookie', redacted)
            .value();
    }

    return req[propName];
}

const winstonLogger = expressWinston.logger({
    winstonInstance: logger,
    baseMeta,
    dynamicMeta,
    level: 'verbose',
    expressFormat: true,
    colorize: dev,
    ignoredRoutes: dev ? ['/_next', '/next_static'] : [],
    requestFilter: redactPrivateRequestData,
});

const winstonErrorLogger = expressWinston.errorLogger({
    winstonInstance: logger,
    baseMeta,
    dynamicMeta,
    requestFilter: redactPrivateRequestData,
    // Should avoid invoking default winston.exception.getAllInfo()
    // logs will contain credential information
    // see: https://github.com/bithavoc/express-winston/pull/149
    exceptionToMeta: _.noop,
});

module.exports = {
    dev,
    logger,
    baseMeta,
    dynamicMeta,
    winstonLogger,
    winstonErrorLogger,
};
