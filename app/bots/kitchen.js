const kitchenBot = {
    availableCommands: [
        {
            name: 'help',
            description:'Shows this listing'
        },
        {
            name: 'info',
            description: 'Shows info about current status'
        },
    ],

    name: 'Kitchen',
    shortName: 'K',

    matcher: [
        /\Kitchen,? (.+)/i,
        /\@UiKitchenBot,? (.+)/i,
        /\K,? (.+)/i,
        /^info/,
        /^help/
    ],

    handleMessage: function(id, message) {
        switch (message) {
            case 'help':
                this.showHelp(id);
                break;
            default:
                this.handleUnknownCommand(id, message)
                break;
        }
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your living room. If you need help, type 'Livingroom, help'.`
            );
    }
};

export default kitchenBot;
