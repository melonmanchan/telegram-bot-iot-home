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

        if (message === 'help') {
            this.showHelp(id);
        } else if (/^sauna on/.test(message) || /^sn on/.test(message)) {
            this.handleSaunaOn(id, message)
        } else if (/^sauna off/.test(message) || /^sn off/.test(message)) {
            this.sendMessage(id, 'Ok! Turning off the sauna...')
        } else {
            this.handleUnknownCommand(id, message)
        }
    },

    handleSaunaOn: function(id, message) {
        this.sendMessage(id, 'Ok! Starting the sauna now...')
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your restroom. If you need help, type 'Restroom, help'.`
        );
    },
};

export default restRoomBot;
