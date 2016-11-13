const restRoomBot = {
    availableCommands: [
        {
            name: 'help',
            description:'Shows this listing'
        },
        {
            name: 'sauna/sn on',
            description: 'Starts the sauna'
        },
        {
            name: 'sauna/sn off',
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
        /\@UiRestRoomBot,? (.+)/i,
        /\R,? (.+)/i,
        /^info/,
        /^help/
    ],

    handleMessage: function(id, message) {
        switch (message) {
            case 'help':
                this.showHelp(id);
                break;
            case 'sauna on':
            case 'sn on':
                this.sendMessage(id, 'Ok! Starting the sauna now...')
                break;
            case 'sauna off':
            case 'sn off':
                this.sendMessage(id, 'Ok! Turning off the sauna...')
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
