import type { App } from "vue";
import XTop from "./components/XTop";
import XButton from "./components/XButton";
import XButtonGroup from "./components/XButtonGroup";
import XMessage from "./components/XMessage";
import XLoad, { XLoadHandler } from "./components/XLoad";
import XInput from "./components/XInput";
import XNumberInput from "./components/XNumberInput";
import XRadio, { XRadioGroup, XRadioButton } from "./components/XRadio";

// package下组件列表
const components = [
    XTop,
    XButton,
    XButtonGroup,
    XMessage,
    XLoad,
    XInput,
    XNumberInput,
    XRadio,
    XRadioGroup,
    XRadioButton,
];

// 定义安装方法 如果使用use注册插件，则将packages中所有组件注册
const install: any = (app: App) => {
    components.forEach((component: any) => {
        if (component.install) {
            // 执行每个组件的install方法
            app.use(component);
        }
        app.component(component.name, component);
    });
};

// 导出对象需要有install才能被Vue.use()方法安装
export default {
    install,
};

// 导出具体的组件
export {
    XTop,
    XButton,
    XButtonGroup,
    XMessage,
    XLoad,
    XLoadHandler,
    XInput,
    XNumberInput,
    XRadio,
    XRadioGroup,
    XRadioButton,
};

export * from "./components";
