import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        通过type设置tag不同的类型。
    `)
};

const closeable: ExampleInfo = {
    title: "可关闭",
    desc: format(`
        通过设置closable为true可以显示标签的关闭按钮，同时通过@close可以传入关闭后触发的事件。
        如果不想通过点击的方式关闭也可以设置auto-close为false,同时也可以通过visible属性手动控制tag的消失跟显示。
    `)
};

const size: ExampleInfo = {
    title: "尺寸",
    desc: format(`
        通过size设置tag的大小，有small、normal、large可选。
    `)
};

const theme: ExampleInfo = {
    title: "主题",
    desc: format(`
        通过theme设置tag的主题，有plain、ghost、fill选。
    `)
};

const round: ExampleInfo = {
    title: "形状",
    desc: format(`
        通过round设置tag为圆角。
    `)
};

export {
    round,
    closeable,
    theme,
    size,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "type",
            describe: "tag的类型",
            type: 'String',
            defaultValue: "default",
            selectList: ["default", "info", "success", "warning", "error"],
        },
        {
            props: "size",
            describe: "tag的尺寸",
            type: 'String',
            defaultValue: "normal",
            selectList: ["small", "normal", "large"],
        },
        {
            props: "theme",
            describe: "tag的主题",
            type: 'String',
            defaultValue: "plain",
            selectList: ["plain", "ghost", "fill"],
        },
        {
            props: "closeable",
            describe: "展示关闭按钮",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "visible",
            describe: "是否展示tag",
            type: 'Boolean',
            defaultValue: "true",
            selectList: ["true", "false"],
        },
        {
            props: "round",
            describe: "展示圆角",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "auto-close",
            describe: "屏蔽自动关闭",
            type: 'Boolean',
            defaultValue: "true",
            selectList: ["true", "false"],
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "close",
            describe: "点击关闭按钮触发事件",
        },
    ],
};