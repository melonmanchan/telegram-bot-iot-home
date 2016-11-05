import fs from 'fs';
import path from 'path';

import { logFatal } from '../log';

const configPath = path.resolve(__dirname, 'config.js');

if (!fs.existsSync(configPath)) {
    logFatal(`No config file called config.js found at ${configPath}`);
}

const config = require('./config.js');
const keys = Object.keys(config);
const missingKeys = ['restroomBotToken', 'kitchenBotToken', 'livingRoomBotToken'].filter(key => {
    return !keys.includes(key);
})

console.log(missingKeys)

if (missingKeys.length != 0) {
    logFatal(`Missing configuration variables: ${missingKeys.join()}`);
}

export default config
