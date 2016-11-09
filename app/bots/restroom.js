const restRoomBot = {
    availableCommands: [
        {
            name: 'help',
            description:'Shows this listing'
        },
        {
            name: 'start sauna',
            description: 'Starts the sauna'
        },
        {
            name: 'stop sauna',
            description: 'Stops the sauna'
        },
        {
            name: 'info',
            description: 'Shows info about my current status'
        },
    ],

    name: 'Restroom',

    matcher: [
        /\Restroom,? (.+)/i,
        /\R,? (.+)/i,
        /^info/,
        /^help/
    ],

    handleMessage: function(id, message) {
        switch (message) {
            case 'help':
                this.showHelp(id);
                break;
            case 'start sauna':
                break;
            default:
                this.handleUnknownCommand(id, message)
                break;
        }
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your restroom. If you need help, type 'Restroom, help'.`
        );
    },
};

export default restRoomBot;
