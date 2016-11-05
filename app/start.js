import { startKitchenBot, startLivingRoomBot, startRestroomBot } from './bots';
import config from './lib/config';

const kitchen = startKitchenBot({groupId: config.groupId, token: config.kitchenBotToken});
const restroom = startRestroomBot({groupId: config.groupId, token: config.restroomBotToken});
const living = startLivingRoomBot({groupId: config.groupId, token: config.livingRoomBotToken});

kitchen.start();
living.start();
restroom.start();
