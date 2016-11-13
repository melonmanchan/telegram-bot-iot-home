const livingRoomBot = {

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
            name: 'tv off',
            description: 'Stops the TV'
        },
        {
            name: 'tv on',
            description: 'Starts the TV'
        },
    ],

    name: 'Livingroom',

    matcher: [
        /\Livingroom,? (.+)/i,
        /\@UiLivingRoomBot,? (.+)/i,
        /\L,? (.+)/i,
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
            `Hi, I'm your living room. If you need help, type 'Livingroom, help'.`
            );
    }
};

export default livingRoomBot;
