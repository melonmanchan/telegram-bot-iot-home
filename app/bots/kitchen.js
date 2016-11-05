import config from '../lib/config';

const kitchenBot = {
    matcher: /\Kitchenbot (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "Kitchenbot Got:" + message + " : " + id);
    }
};

export default kitchenBot;
