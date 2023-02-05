import { App } from 'vue';
import XAlert from './src/XAlert';

(<any>XAlert).install = (app: App) => {
  app.config.globalProperties.$x_alert = XAlert;
};

export { XAlert };

export default XAlert;