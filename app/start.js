import { startKitchenBot, startLivingRoomBot, startRestroomBot } from './bots';
import config from './lib/config';
import { log } from './lib/log';

const kitchen = startKitchenBot({groupId: config.groupId, token: config.kitchenBotToken});
const restroom = startRestroomBot({groupId: config.groupId, token: config.restroomBotToken});
const living = startLivingRoomBot({groupId: config.groupId, token: config.livingRoomBotToken});

kitchen.start();
living.start();
restroom.start();

log('Bots are listening for commands...');
