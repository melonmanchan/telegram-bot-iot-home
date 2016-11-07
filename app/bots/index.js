import table from 'text-table';
import kitchenBot from './kitchen';
import livingRoomBot from './livingroom';
import restRoomBot from './restroom';

import TelegramBot  from 'node-telegram-bot-api';
import config from '../lib/config';

require('string_score');
console.log('hello world'.score('ow'));
function startBot(options = {}) {
    const { groupId, token } = options;

    return {
        availableCommands: [],
        groupId,
        token,
        onMessageGroup: function (msg) {
            const message = msg.input
            const sansPrefix = message.substr(message.indexOf(' ') + 1);
            this.handleMessage(this.groupId, sansPrefix);
        },

        onMessagePrivate: function (msg) {
            const fromId = msg.from.id;
            this.handleMessage(fromId, msg.text);
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


            //this.postStart();
        },

        // Actual functionality
        showHelp: function (id) {
            const asArrays = this.availableCommands.map(c => {
                return [ "" + c.name + "",
                        c.description
                ];
            });

            const withHeading = [['COMMAND', 'DESCRIPTION']].concat(asArrays);

            const t = "`" + table(withHeading, { hsep: "  |  " }) + "`"

            this.bot.sendMessage(id, t, { parse_mode: "Markdown" });
        },

        handleUnknownCommand(id, message) {
            let helpMessage = 'Sorry! I didn\'t quite get that!\n';

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

            helpMessage += "Type 'myname help' for full listing of commands."
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
