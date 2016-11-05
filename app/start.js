import { startKitchenBot } from './bots';
import config from './lib/config';

startKitchenBot({groupId: config.groupId})();
