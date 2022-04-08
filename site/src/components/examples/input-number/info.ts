import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        使用x-number-input使用数字输入框。
    `)
};

const plusAndMinus: ExampleInfo = {
    title: "展示加减按钮",
    desc: format(`
        设置number-button为true展示加减按钮。
    `)
};

const step: ExampleInfo = {
    title: "设置步长",
    desc: format(`
        通过step可以设置每次点击增加的步长。
    `)
};

const limit: ExampleInfo = {
    title: "大小限制",
    desc: format(`
        通过max和min可以限制输入的最大最小值。
    `)
};

const disabled: ExampleInfo = {
    title: "禁用输入",
    desc: format(`
        设置disabled可以禁用输入框。
    `)
};

const onInput: ExampleInfo = {
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

export {
    focusAndBlur,
    onInput,
    disabled,
    limit,
    step,
    plusAndMinus,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
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
            props: "clearable",
            describe: "是否显示清除按钮",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"]
        },
        {
            props: "step",
            describe: "步长",
            type: "String | Number",
            defaultValue: "1",
        },
        {
            props: "max",
            describe: "最大限制",
            type: "Number",
        },
        {
            props: "min",
            describe: "最小限制",
            type: "Number",
        },
        {
            props: "number-button",
            describe: "是否展示加减按钮",
            defaultValue: "false",
            type: "Boolean",
            selectList: ["true", "false"],
        },
        {
            props: "status",
            describe: "输入框状态",
            type: "Stirng",
            selectList: ["error"]
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