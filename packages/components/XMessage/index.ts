import { App } from "vue";
import XMessage from "./src/XMessage";

(<any>XMessage).install = (app: App) => {
    // 方便this.$as_message调用
    app.config.globalProperties.$as_message = XMessage;
};

export { XMessage };

export default XMessage;
