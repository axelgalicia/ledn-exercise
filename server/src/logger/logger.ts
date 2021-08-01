/**
 * @description Component to define the global Logger
 *              for the application.
 * @author Axel Galicia - axelgalicia@gmail.com
 */

import pino from 'pino';

const Logger = pino({
    prettyPrint: true
});

export { Logger }