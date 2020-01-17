// @noflow
/* eslint-disable global-require, no-caller, no-restricted-properties, no-console, func-names, no-param-reassign */

const MAX_LOG_DATA_SIZE = 10000;

// Copied from https://github.com/Coggle/console-winston/blob/98538f7cda1dab868a107483b6ef24dc2bbc409d/lib/console.js
// This function would override global console.error by winston logger.error;
// This path is to fix Nextjs page render error log issue. The Nextjs would swallow all errors and only run `console.error(err)`
function processErrorArgs(argValues, hostname) {
    // for error messages and critical error messages
    // we need should try and provide a backtace for debugging
    // also if the we've got a full error object, try to
    // simplfy the message to something useful
    const err = argValues[0];
    let message = err.message;
    // extract a useful error message
    if (err instanceof Error || (typeof err === 'object' && message)) {
        // try to parse JSON message if possible
        // we could query fields in message JSON Kibana log
        if (typeof message === 'string') {
            try {
                message = JSON.parse(message);
            } catch (e) {
                // wrap it as Object for log
                message = {
                    errorlog: message,
                };
            }
        }
        argValues[0] = message;
    }

    let stack = err && err.stack;
    if (!stack) {
        const errorInfo = {};
        Error.captureStackTrace(errorInfo, arguments.callee.caller);
        stack = errorInfo.stack;
    }

    const meta = {
        timestamp: new Date(),
        hostname,
        stack: stack.slice(0, MAX_LOG_DATA_SIZE),
    };
    argValues.push(meta);

    return argValues;
}

function overrideConsoleError(logger, hostname) {
    console.error = (...args) => logger.error(...processErrorArgs(args, hostname));
}

module.exports = overrideConsoleError;
