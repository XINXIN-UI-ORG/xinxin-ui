import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础用法",
    desc: format(`
        消息提示可接收一个对象，通过message设置提示文字，通过type设置提示类型，类型分为info、success、warning、error，可以通过type属性设置。
    `)
};

const duration: ExampleInfo = {
    title: "设置关闭时间",
    desc: format(`
        通过duration属性可以设置消息关闭时间。
    `)
};

const close: ExampleInfo = {
    title: "设置关闭按钮",
    desc: format(`
        如果想提前结束消息弹出，可以通过设置closable属性为true来显示关闭按钮。
    `)
};

const closeEvent: ExampleInfo = {
    title: "关闭回调",
    desc: format(`
        如果希望在消息提示关闭后触发事件，可以设置onClose属性实现。
    `)
};

const icon: ExampleInfo = {
    title: "设置提示图标",
    desc: format(`
        通过icon设置消息提示图标。
    `)
};

export {
    icon,
    closeEvent,
    close,
    duration,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "type",
            describe: "按钮类型。",
            type: 'String',
            defaultValue: 'default',
            selectList: ['default', 'info', 'success', 'warning', 'error'],
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [],
};