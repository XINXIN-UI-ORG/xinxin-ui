import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        使用v-model绑定checked可以设置复选框是否选中。
    `)
};

const disabled: ExampleInfo = {
    title: "禁用",
    desc: format(`
        通过设置disabled属性为true可以禁用复选框。
    `)
};

const indeterminate: ExampleInfo = {
    title: "部分选中",
    desc: format(`
        在选中和未选中之间还有一个中间态indeterminate，表示部分选中。
    `)
};

const description: ExampleInfo = {
    title: "带描述",
    desc: format(`
        通过名为description的slot为选框添加描述信息。
    `)
};

const card: ExampleInfo = {
    title: "卡片样式",
    desc: format(`
        通过设置card为true展示卡片样式。
    `)
};

const checkboxGroup: ExampleInfo = {
    title: "多选组",
    desc: format(`
        将多个勾选框的value绑定到同一数组。
    `)
};

const groupDisabled: ExampleInfo = {
    title: "多选组禁用",
    desc: format(`
        在按钮组上使用disabled属性禁用一组多选框。
    `)
};

const change: ExampleInfo = {
    title: "change事件",
    desc: format(`
        通过@change事件可以监听多选组的变化。
    `)
};

const checkboxButton: ExampleInfo = {
    title: "Button样式",
    desc: format(`
        将x-checkbox替换成x-checkbox-button即可体验Button样式。size属性还可以选择Button大小，有small、normal、large可选。
    `)
};

const size: ExampleInfo = {
    title: "尺寸",
    desc: format(`
        使用size属性可以设置复选框大小。
    `)
};

export {
    size,
    checkboxButton,
    change,
    groupDisabled,
    card,
    description,
    checkboxGroup,
    indeterminate,
    disabled,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "checked",
            describe: "单个复选框是否选中",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "label",
            describe: "复选框内容",
            type: 'String',
            defaultValue: "xinxin-ui",
        },
        {
            props: "value",
            describe: "复选框value，结合复选框组使用，选中的复选框的value会被添加到复选框组的集合中。",
            type: 'Number | Boolean | String',
        },
        {
            props: "disabled",
            describe: "禁用复选框",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "indeterminate",
            describe: "部分选中样式",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "description",
            describe: "为选项添加描述信息",
            type: 'slot',
        },
        {
            props: "card",
            describe: "使用卡片样式",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "CheckboxGroup",
            describe: "-----",
            type: '-----',
        },
        {
            props: "name",
            describe: "设置多选框name",
            type: 'String',
        },
        {
            props: "disabled",
            describe: "禁用多选框",
            type: 'Boolean',
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "CheckboxButton",
            describe: "-----",
            type: '-----',
        },
        {
            props: "size",
            describe: "设置按钮大小",
            type: 'String',
            defaultValue: "normal",
            selectList: ["small", "normal", "large"],
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "change",
            describe: "监听多选组值的变化",
            props: ["value"],
        }
    ],
};