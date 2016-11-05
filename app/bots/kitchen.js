const kitchenBot = {
    matcher: /\Kitchen,? (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "Kitchenbot Got:" + message + " : " + id);
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
           `Hi,
            I'm your kitchen. Call me with 'Kitchen, <message>'.
            To ask me for help, type 'Kitchen, help'.`);
    }
};

export default kitchenBot;
