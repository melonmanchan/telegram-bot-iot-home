const livingRoomBot = {
    matcher: /\Livingroom (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "LivingRoomBot Got:" + message + " : " + id);
    }
};

export default livingRoomBot;
