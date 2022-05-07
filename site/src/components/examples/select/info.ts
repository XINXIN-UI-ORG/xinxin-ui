import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        通过options将x-select的可选值传入，options是一个数组，数组每项是一个对象，对象中可传入label和value，同时使用v-model绑定变量，
        当用户选中其中的项时，x-select会将options中对应的value赋值给v-model绑定的变量，其次通过设置options中每一项中的disabled为true可禁用其中某一项。
    `)
};

const size: ExampleInfo = {
    title: "尺寸",
    desc: format(`
        通过size尺寸可以设置x-select的大小，有small、normal、large可选。
    `)
};

const disabled: ExampleInfo = {
    title: "禁用",
    desc: format(`
        通过设置disabled属性为true来禁用x-select。
    `)
};

const clearable: ExampleInfo = {
    title: "可清空内容",
    desc: format(`
        通过设置clearable属性为true可以显示清空按钮，点击可清空x-select的内容。
    `)
};

const filterable: ExampleInfo = {
    title: "可过滤",
    desc: format(`
        通过设置filterable属性为true可以筛选x-select中的选项。
    `)
};

const multiple: ExampleInfo = {
    title: "多选",
    desc: format(`
        通过设置multiple属性为true可以开启x-select多选。
    `)
};

const multipleCollapse: ExampleInfo = {
    title: "多选折叠",
    desc: format(`
        如果有时觉得选项太多，可以通过设置collapse-tags属性为true可以开启x-select多选折叠，可以使用collapse-tags-tooltip属性启用鼠标悬停在折叠标签上显示具体的所选值。
    `)
};

const group: ExampleInfo = {
    title: "选项组",
    desc: format(`
        将选项分组展示。
    `)
};

const event: ExampleInfo = {
    title: "事件",
    desc: format(`
        通过@focus和@blur提供select聚焦和失焦时触发的事件。
        如果你问我select更新所选值时的change事件怎么没有？点击清除按钮清空所选值的clear-value事件怎么没有？多选时点击tag删除某一项的delete-tag事件怎么没有？
        我觉得这些都可以通过监听传入的value值实现，或许你需要在多选的情况下通过以上提到的事件来单独获取某一被选中和删除的值，那个嘛，以后再说吧~~~
    `)
};

const virtualSelect: ExampleInfo = {
    title: "虚拟列表",
    desc: format(`
        超多选项，超多超多超多，嗯，超多。
    `)
};

export {
    virtualSelect,
    event,
    group,
    multipleCollapse,
    multiple,
    filterable,
    clearable,
    disabled,
    size,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "options",
            describe: "x-select的可选值",
            type: 'Array<{label: string, value: string | number, disabled: boolean}>',
        },
        {
            props: "size",
            describe: "x-select组件的大小",
            type: "String",
            defaultValue: "normal",
            selectList: ["small", "normal", "large"],
        },
        {
            props: "placeholder",
            describe: "x-select中的提示",
            type: "String",
        },
        {
            props: "block",
            describe: "设置x-select为块级",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "size",
            describe: "设置x-select的尺寸，有small、normal、large可选",
            type: "String",
            defaultValue: "normal",
            selectList: ["small", "normal", "large"],
        },
        {
            props: "disabled",
            describe: "禁用x-select",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "clearable",
            describe: "显示清除按钮",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "filterable",
            describe: "可筛选",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "multiple",
            describe: "可多选",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "collapse-tags",
            describe: "多选折叠",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "collapse-tags-tooltip",
            describe: "多选折叠提示",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "focus",
            describe: "select聚焦事件"
        },
        {
            event: "blur",
            describe: "select失焦事件"
        },
    ],
};