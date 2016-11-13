const kitchenBot = {
    availableCommands: [
        {
            name: 'help',
            description:'Shows this listing'
        },
        {
            name: 'info',
            description: 'Shows info about my current status'
        },
        {
            name: 'coffeemaker on',
            description: 'Start the coffee maker'
        },
        {
            name: 'coffeemaker off',
            description: 'Stops the coffee maker'
        },
    ],

    name: 'Kitchen',

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
