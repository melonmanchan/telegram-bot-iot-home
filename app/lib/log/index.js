'use strict';

import chalk from 'chalk';
import dateformat from 'dateformat';
import log_types from './log_types';

function log(message, type=log_types.INFO) {
    let now = Date();
    let timeStamp = dateformat(now, '[HH:MM:ss dd/mm/yyyy] ')
    console.log(timeStamp + type(message));
}

function logFatal(message, exitCode=-1) {
    log(message, log_types.ALERT);
    process.exit(exitCode);
}

export { log, logFatal }

