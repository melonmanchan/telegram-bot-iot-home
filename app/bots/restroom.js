const restRoomBot = {
    matcher: /\Restroom,? (.+)/,

    handleMessage: function(id, message) {
        this.bot.sendMessage(id, "restRoomBot Got:" + sansPrefix + " : " + id);

        switch (message) {
            case 'start sauna':
                    break;
        }
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your restroom. If you need help, type 'Restroom, help'.`
        );
    }
};

export default restRoomBot;
