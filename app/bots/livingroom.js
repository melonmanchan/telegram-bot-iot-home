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
        {
            name: 'tv channel <number>',
            description: 'Changes the TV to channel <number>, if on'
        },
        {
            name: 'tv volume [0, 100]',
            description: 'Changes the TV volume to specified amount'
        },
    ],

    state: {
        tvOn: false,
        channel: 3,
        volume: 50,
    },

    name: 'Livingroom',

    matcher: [
        /\Livingroom,? (.+)/i,
        /\@UiLivingRoomBot,? (.+)/i,
        /\L,? (.+)/i,
        /^info/,
        /^help/
    ],

    handleMessage: function(id, message) {
        if (message === 'help') {
            this.showHelp(id);
        } else if (message === 'tv off') {
            this.handleStopTV(id, message) ;
        } else if (message === 'tv on') {
            this.handleStartTV(id, message) ;
        } else if (/^tv channel /.test(message)) {
            this.handleTVChannel(id, message);
        } else if (/^tv volume /.test(message)) {
            this.handleTVVolume(id, message);
        } else {
            this.handleUnknownCommand(id, message);
        }
    },

    handleTVChannel: function(id, message) {
        const messageArr = message.split(" ");

        if (messageArr.length === 2) {
            this.sendMessage(id, 'You should specify a channel.')
            return;
        }

        const channel = Math.floor(parseInt(messageArr[2], 10));

        if (isNaN(channel)) {
            this.sendMessage(id, `Hmm, looks like ${messageArr[2]} is not a channel number...`)
            return;
        }

        if (channel <= 0 || channel > 20){
            this.sendMessage(id, `The channel ${channel} does not exist. Available channels are 0 through 20.`);
            return;
        }

        this.sendMessage(id, `Ok, tuning to channel ${channel}...`);
        this.state.channel = channel;

        if (this.state.tvOn === false) {
            this.sendMessage(id, `Please type 'Livingroom tv on' to turn on the tv`)
        }
    },

    handleTVVolume: function(id, message) {

    },

    handleStartTV: function(id, message) {
        if (this.state.tvOn === true) {
            this.sendMessage(id, 'The TV is already turned on!');
        } else {
            this.sendMessage(id, 'Ok! Turning on the TV...');
            this.state.tvOn = true;
        }
    },

    handleStopTV: function(id, message) {
        if (this.state.tvOn === false) {
            this.sendMessage(id, 'The TV is already turned off!');
        } else {
            this.sendMessage(id, 'Ok! Turning off the TV...');
            this.state.tvOn = false;
        }
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your living room. If you need help, type 'Livingroom, help'.`
            );
    }
};

export default livingRoomBot;
