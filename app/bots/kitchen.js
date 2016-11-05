import TelegramBot  from 'node-telegram-bot-api';
import config from '../lib/config';

function startKitchenBot(options={}) {
    return function() {
        const token = config.kitchenBotToken

        const bot =  new TelegramBot(token, { polling: true});

        bot.onText(/\/kitchen (.+)/, function (msg, match) {
            console.log(msg)
            var fromId = msg.chat.id;
            var resp = match[1];
            console.log(resp);
            bot.sendMessage(fromId, resp);
        });

        bot.sendMessage(options.groupId, 'Good morning!');
    }
}

export default startKitchenBot;
