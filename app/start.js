import { startKitchenBot } from './bots';
import config from './lib/config';

const kitchen = startKitchenBot({groupId: config.groupId, token: config.kitchenBotToken});

kitchen.start();
