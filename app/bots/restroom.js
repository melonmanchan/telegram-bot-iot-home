const restRoomBot = {
    matcher: /\Restroom,? (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "restRoomBot Got:" + sansPrefix + " : " + id);
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
           `Hi,
            I'm your restroom. Call me with 'Restroom, command'
            To ask for help, type 'Restroom, help'.`);
    }
};

export default restRoomBot;
