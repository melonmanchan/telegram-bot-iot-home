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
            name: 'show info',
            description: 'Shows information about me!'
        },
    ],

    matcher: [/\Restroom,? (.+)/i, /info/],

    handleMessage: function(id, message) {
        switch (message) {
            case 'help':
                this.showHelp(id);
                break;
            case 'start sauna':
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
