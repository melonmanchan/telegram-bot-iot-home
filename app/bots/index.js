import table from 'text-table';
import kitchenBot from './kitchen';
import livingRoomBot from './livingroom';
import restRoomBot from './restroom';

import TelegramBot  from 'node-telegram-bot-api';
import config from '../lib/config';

require('string_score');

function startBot(options = {}) {
    const { groupId, token } = options;

    return {
        availableCommands: [],
        defaultCommands: [
            {
                name: 'help',
                description:'Shows this listing'
            },
            {
                name: 'info',
                description: 'Shows info current status'
            },
            {
                name: 'lights/ls on',
                description: 'Turns on the lights'
            },
            {   name: 'lights/ls off',
                description: 'Turns off the lights'
            }],
        groupId,
        token,
        onMessageGroup: function (msg) {
            const message = msg.input;

            if (message.startsWith(this.name) || message.startsWith(this.name + ',') || message.startsWith(this.shortName)) {
                const sansPrefix = message.substr(message.indexOf(' ') + 1);
                this.handleGeneralMessage(this.groupId, sansPrefix);
            } else {
                this.handleGeneralMessage(this.groupId, message);
            }
        },

        onMessagePrivate: function (msg) {
            const fromId = msg.from.id;
            this.handleGeneralMessage(fromId, msg.text);
        },

        handleGeneralMessage: function(id, message) {
            if (message === 'help') {
                this.showHelp(id);
            } else if (message === 'info') {
                this.showInfo(id);
            } else if (message === 'lights off' || message === 'ls off') {
                this.turnOffLights(id);
            } else if (message === 'ls on' || message === 'lights on') {
                this.turnOnLights(id);
            } else {
                this.handleMessage(id, message);
            }
        },

        turnOffLights: function(id) {
            this.bot.sendMessage(id, 'Lights have been turned off')
        },
        turnOnLights: function(id) {
            this.bot.sendMessage(id, 'Lights have been turned on')
        },

        start: function () {
            this.bot = new TelegramBot(this.token, { polling: true });

            this.bot.on('message', msg => {
                if (msg.chat.id !== this.groupId) {
                    this.onMessagePrivate(msg);
                }
            });

            this.matcher.map((m) => {
                this.bot.onText(m, (matcher, msg) => {
                    this.onMessageGroup(msg);
                });
            });


            this.postStart();
        },

        sendMessage: function(id, message) {
            this.bot.sendMessage(id, message);
        },


        // Actual functionality
        showHelp: function (id) {
            const allCommands = this.defaultCommands.concat(this.availableCommands);

            const asArrays = allCommands.map(c => {
                return [ "" + c.name + "",
                        c.description
                ];
            });

            const withHeading = [['ACTION', 'DESCRIPTION']].concat(asArrays);

            const t = "`" + table(withHeading, { hsep: "  |  " }) + "`"

            this.bot.sendMessage(id, t, { parse_mode: "Markdown" });
        },

        handleUnknownCommand(id, message) {
            let helpMessage = 'Sorry! I didn\'t quite understand that!\n';

            const availableNames = this.availableCommands.map(c => { return c.name });

            let scored = availableNames.reduce((arr, name) => {
                const score = name.score(message);
                if (score > 0.3) {
                    arr.push({name: name, score: score});
                }
                return arr;
            }, []);

            if (scored.length != 0) {
                scored.sort((a, b) => {
                    return a.score < b.score;
                });

                const possibilityMessages = scored.map(p => { return "\n" + p.name }).join("");
                helpMessage += 'Did you mean any of the following: ' + possibilityMessages + ' \n';
            }

            helpMessage += `Type "${this.name} help" for a full list of actions`
            this.bot.sendMessage(id, helpMessage);
        }
    }
};

function startKitchenBot(options = { }) {
    const bot = startBot(options);
    const newBot = Object.assign({}, bot, kitchenBot)
    return newBot;
};

function startRestroomBot(options = { }) {
    const bot = startBot(options);
    const newBot = Object.assign({}, bot, restRoomBot)
    return newBot;
};

function startLivingRoomBot(options = { }) {
    const bot = startBot(options);
    const newBot = Object.assign({}, bot, livingRoomBot)
    return newBot;
};

export { startKitchenBot, startLivingRoomBot, startRestroomBot };
