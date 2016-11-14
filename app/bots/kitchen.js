const kitchenBot = {
    availableCommands: [
        {
            name: 'coffee on',
            description: 'Starts the coffee maker'
        },
        {
            name: 'coffee off',
            description: 'Stops the coffee maker'
        },
    ],

    name: 'Kitchen',
    shortName: 'KN',

    matcher: [
        /\Kitchen,? (.+)/i,
        /\@UiKitchenBot,? (.+)/i,
        /\KN,? (.+)/i,
        /^info/,
        /^help/
    ],

    handleMessage: function(id, message) {
        this.handleUnknownCommand(id, message);
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your living room. If you need help, type 'Livingroom, help'.`
            );
    }

};

export default kitchenBot;
