const livingRoomBot = {

    availableCommands: [
        {
            name: 'help',
            description:'Shows this listing'
        },
        {
            name: 'show info',
            description: 'Shows information about me!'
        },
    ],

    name: 'Livingroom',

    matcher: [/\Livingroom,? (.+)/i, /^info/, /^help/],

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
