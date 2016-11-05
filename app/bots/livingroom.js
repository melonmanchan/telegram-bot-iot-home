const livingRoomBot = {
    matcher: /\Livingroom,? (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "LivingRoomBot Got:" + message + " : " + id);
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
           `Hi,

            I'm your living room! Call me with 'Livingroom, <message>'.
            To ask me for help, type 'Livingroom, help'.`);
    }
};

export default livingRoomBot;
