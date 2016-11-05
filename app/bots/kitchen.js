const kitchenBot = {
    matcher: /\Kitchen (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "Kitchenbot Got:" + message + " : " + id);
    }
};

export default kitchenBot;
