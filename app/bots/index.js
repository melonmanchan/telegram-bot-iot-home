import kitchenBot from './kitchen';
import TelegramBot  from 'node-telegram-bot-api';
import config from '../lib/config';

function startBot(options = {}) {
    const { groupId, token } = options;

    return {
        groupId,
        token,
        start: function () {
            this.bot = new TelegramBot(this.token, { polling: true });

            this.bot.on('message', msg => {
                if (msg.chat.id !== this.groupId) {
                    this.onMessagePrivate(msg);
                }
            });

            this.bot.onText(this.matcher, (matcher, msg) => {
                this.onMessageGroup(msg);
            });
        }
    }
};

function startKitchenBot(options = { }) {
    const bot = startBot(options);
    const newBot = Object.assign({}, bot, kitchenBot)
    return newBot;
};

export { startKitchenBot }
