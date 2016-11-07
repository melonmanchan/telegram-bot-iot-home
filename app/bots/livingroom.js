const livingRoomBot = {
    matcher: /\Livingroom,? (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "LivingRoomBot Got:" + message + " : " + id);
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your living room. If you need help, type 'Restroom, help'.`
            );
    }
};

export default livingRoomBot;
