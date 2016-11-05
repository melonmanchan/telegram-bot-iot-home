import config from '../lib/config';

const kitchenBot = {
    matcher: /\Kitchenbot (.+)/,
    onMessageGroup: function (msg) {
        this.bot.sendMessage(this.groupId, 'We are in chat');
    },

    onMessagePrivate: function (msg) {
        const fromId = msg.from.id;
        this.bot.sendMessage(fromId, 'We are in private!')
    }
};

export default kitchenBot;
