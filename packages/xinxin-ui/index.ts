import type { App } from "vue";
import { 
    XButton,
    XButtonGroup,
    XMessage,
    XLoad,
    XTop,
    XInput,
    XNumberInput,
    XRadio,
    XRadioGroup,
    XRadioButton,
    XCheckbox,
    XCheckboxGroup,
    CheckboxButton,
    Select,
    Popover,
    Scrollbar,
    Tag,
    SelectTypeEnum,
    Switch,
    Form,
    FormItem,
} from "@xinxin-ui/components";
import type { FormRules } from "@xinxin-ui/symbols";

// package下组件列表
const components = [
    XButton,
    XButtonGroup,
    XMessage,
    XLoad,
    XTop,
    XInput,
    XNumberInput,
    XRadio,
    XRadioGroup,
    XRadioButton,
    XCheckbox,
    XCheckboxGroup,
    CheckboxButton,
    Select,
    Popover,
    Scrollbar,
    Tag,
    Switch,
    Form,
    FormItem,
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
    XButton,
    XButtonGroup,
    XMessage,
    XLoad,
    XTop,
    XInput,
    XNumberInput,
    XRadio,
    XRadioGroup,
    XRadioButton,
    XCheckbox,
    XCheckboxGroup,
    CheckboxButton,
    Select,
    Popover,
    Scrollbar,
    Tag,
    Switch,
    Form,
    FormItem,
};

// 导出类型
export {
    SelectTypeEnum,
    FormRules,
};
