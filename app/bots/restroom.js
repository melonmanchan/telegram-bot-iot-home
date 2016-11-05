const restRoomBot = {
    matcher: /\Restroom (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "restRoomBot Got:" + message + " : " + id);
    }
};

export default restRoomBot;
