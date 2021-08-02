/**
 *  Component to define the global Logger
 *              for the application.
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import pino from 'pino';

const Logger = pino({
    prettyPrint: true
});

export { Logger }