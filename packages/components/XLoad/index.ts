import { App } from "vue";
import XLoad, {XLoadHandler} from "./src/XLoad";

(XLoad as any).install = (app: App) => {
    app.config.globalProperties.$x_load = XLoad;
}

export {
    XLoad,
    XLoadHandler,
}

export default XLoad;
