import pino from 'pino';

const Logger = pino({
    prettyPrint: true
});

export { Logger }