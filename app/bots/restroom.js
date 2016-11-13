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
            name: 'sauna/sn temp [30-120]',
            description: 'Sets sauna temperature'
        },
        {
            name: 'sauna/sn off',
            description: 'Stops the sauna'
        },
        {
            name: 'info',
            description: 'Shows info about status'
        },
    ],

    state: {
        saunaOn: false,
        temperature: 80,
    },

    name: 'Restroom',
    shortName: 'R',

    matcher: [
        /\Restroom,? (.+)/i,
        /\@UiRestRoomBot,? (.+)/i,
        /\R,? (.+)/i,
        /^info/,
        /^sauna on/,
        /^sauna off/,
        /^sn on/,
        /^sn off/,
        /^sauna temp (.+)/,
        /^sn temp (.+)/,
        /^help/
    ],

    handleMessage: function(id, message) {
        if (message === 'help') {
            this.showHelp(id);
        } else if (/^sauna on/.test(message) || /^sn on/.test(message)) {
            this.handleSaunaOn(id, message)
        } else if (/^sauna temp/.test(message) || /^sn temp/.test(message)) {
            this.handleSaunaTemperature(id, message)
        } else if (/^sauna off/.test(message) || /^sn off/.test(message)) {
            this.handleSaunaOff(id, message)
        } else {
            this.handleUnknownCommand(id, message)
        }
    },

    handleSaunaTemperature: function(id, message) {
        const messageArr = message.split(" ");

        if (messageArr.length === 2) {
            this.sendMessage(id, 'You should specify a temperature')
            return;
        }

        const temp = Math.floor(parseInt(messageArr[2], 10));

        if (isNaN(temp)) {
            this.sendMessage(id, `Hmm, looks like ${messageArr[2]} is not a temperature...`)
            return;
        }

        if (temp < 30) {
            this.sendMessage(id, `${temp} celsius is too cold for a sauna!...`)
            this.sendMessage(id, `Maximum temperature is 120 celsius, minimum is 30`)
            return;
        }

        if (temp > 120) {
            this.sendMessage(id, `Whoa! ${temp} celsius way too hot!...`)
            this.sendMessage(id, `Maximum temperature is 120 celsius, minimum is 30 celsius.`)
            return;
        }

        this.sendMessage(id, `Ok! Setting sauna temperature to ${temp} celsius...`)
        this.state.temperature = temp;

        if (this.state.saunaOn === false) {
            this.sendMessage(id, `Please type 'Restroom sauna on' to start the sauna!`)
        }
    },

    handleSaunaOff: function (id, message) {
        if (this.state.saunaOn === false) {
            this.sendMessage(id, 'The sauna is already turned off');
            this.sendMessage(id, `Type 'Restroom info' to get information abou my current status!`);
        } else {
            this.sendMessage(id, 'Ok! Turning off the sauna...')
            this.state.saunaOn = false;
        }
    },

    handleSaunaOn: function(id, message) {
        if (this.state.saunaOn === true) {
            this.sendMessage(id, `The sauna is already turned on.`);
            this.sendMessage(id, `Type 'Restroom info' to
                 get information abou my current status!`);
            return;
        }

        const messageArr = message.split(" ");

        // No timer specified...
        if (messageArr.length === 2) {
            this.sendMessage(id, 'Ok! Starting the sauna now...')
        } else {
            const time = messageArr[2];

            if (/\d+m$/.test(time)) {
                this.sendMessage(id, `Ok! Starting the sauna in ${time.slice(0, -1)} minutes...`);
            } else if (/\d+h$/.test(time)) {
                this.sendMessage(id, `Ok! Starting the sauna in ${time.slice(0, -1)} hours...`);
            } else {
                this.sendMessage(id, `Sorry! I didn't understand the time ${time}.`);
                this.sendMessage(id, 'For example, valid times (sauna on 5m) and hours (sauna on 1h).');
            }
        }

        this.state.saunaOn = true;
    },

    postStart: function () {
        this.bot.sendMessage(this.groupId,
            `Hi, I'm your restroom. If you need help, type 'Restroom, help'.`
        );
    },
};

export default restRoomBot;
