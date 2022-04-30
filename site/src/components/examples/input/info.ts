import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础用法",
    desc: format(`
        使用x-input展示输入框。
    `)
};

const mode: ExampleInfo = {
    title: "模式",
    desc: format(`
        通过mode设置大小，有small、normal、large可选。
    `)
};

const size: ExampleInfo = {
    title: "尺寸",
    desc: format(`
        输入框默认是行内的，通过size控制长度，可设置任意的数值。
    `)
};

const disabled: ExampleInfo = {
    title: "禁用",
    desc: format(`
        通过disabled属性设置输入框禁用。
    `)
};

const fix: ExampleInfo = {
    title: "前后缀",
    desc: format(`
        通过x-input提供的prefix和suffix插槽可以在输入框前后设置文字或图标。
    `)
};

const clear: ExampleInfo = {
    title: "一键清除",
    desc: format(`
        设置clearable属性为true可显示一键清除按钮。
    `)
};

const password: ExampleInfo = {
    title: "密码模式",
    desc: format(`
        当type设置为password后可以使用show-password-on显示密码。使用show-password-on可以配置显示密码的触发器，可以设置click和mousedown。
    `)
};

const status: ExampleInfo = {
    title: "输入框状态",
    desc: format(`
        设置status为error可触发输入框错误状态，错误状态会修改边框的样式。
    `)
};

const block: ExampleInfo = {
    title: "块级输入框",
    desc: format(`
        input框默认是行内的，如果希望input框填充整行可以通过设置block为true来实现。
    `)
};

const inputEvent: ExampleInfo = {
    title: "事件-onInput",
    desc: format(`
        通过@onInputChange可以设置输入框的input事件。
    `)
};

const focusAndBlur: ExampleInfo = {
    title: "事件-focus&blur",
    desc: format(`
        通过@onInputBlur和@onInputFocus可以设置输入框的focus和blur事件。
    `)
};

const readonly: ExampleInfo = {
    title: "只读",
    desc: format(`
        通过设置readonly属性为true来禁止输入框输入，但不像disabled，readonly只是不允许输入，其他的和正常的input没有区别。
    `)
};

export {
    readonly,
    focusAndBlur,
    inputEvent,
    block,
    status,
    password,
    clear,
    fix,
    disabled,
    size,
    mode,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "type",
            describe: "输入框内容类型",
            type: 'Stirng',
            defaultValue: "text",
            selectList: ["text", "password", "number"],
        },
        {
            props: "block",
            describe: "是否显示为块级元素",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "mode",
            describe: "设置输入框的尺寸",
            type: 'Stirng',
            defaultValue: "normal",
            selectList: ["small", "normal", "large"],
        },
        {
            props: "size",
            describe: "当输入框为行内元素时，可以配置输入框长度",
            type: 'Number',
            defaultValue: "20",
        },
        {
            props: "disabled",
            describe: "是否禁用输入框",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "prefix",
            describe: "前缀插槽",
            type: "slot"
        },
        {
            props: "suffix",
            describe: "后缀插槽",
            type: "slot"
        },
        {
            props: "clearable",
            describe: "是否显示清除按钮",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"]
        },
        {
            props: "show-password-on",
            describe: "是否展示显示密码按钮",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"]
        },
        {
            props: "status",
            describe: "输入框状态",
            type: "Stirng",
            selectList: ["error"]
        },
        {
            props: "readonly",
            describe: "只读",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"]
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "onInputChange",
            describe: "输入框onInput事件",
            props: ["value"],
        },
        {
            event: "onInputFocus",
            describe: "输入框onFocus事件",
            props: ["value"],
        },
        {
            event: "onInputBlur",
            describe: "输入框onBlur事件",
            props: ["value"],
        },
    ],
};