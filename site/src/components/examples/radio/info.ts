import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        使用v-model绑定变量，如果radio被选中，会将value的值赋值给v-model绑定的变量，value可以是Number，String，Boolean。
    `)
};

const desc: ExampleInfo = {
    title: "带描述",
    desc: format(`
        x-radio提供了一个description插槽，可以为选项添加描述信。
    `)
};

const disabled: ExampleInfo = {
    title: "禁用",
    desc: format(`
        设置disabled为true可以禁用radio。
    `)
};

const card: ExampleInfo = {
    title: "卡片样式",
    desc: format(`
        设置card为true可以展示卡片样式。
    `)
};

const radioGroup: ExampleInfo = {
    title: "按钮组",
    desc: format(`
        使用x-radio-group可包裹x-radio组成一组单选框，通过设置name和v-model来统一管理一组radio。
    `)
};

const groupDisabled: ExampleInfo = {
    title: "按钮组禁用",
    desc: format(`
        设置disabled属性可以禁用按钮组。
    `)
};

const change: ExampleInfo = {
    title: "按钮组change事件",
    desc: format(`
        @change设置按钮组的change事件。
    `)
};

const radioButton: ExampleInfo = {
    title: "Button样式",
    desc: format(`
        将x-radio替换成x-radio-button即可体验Buttion样式。
    `)
};

const radioButtonSize: ExampleInfo = {
    title: "Button尺寸",
    desc: format(`
        通过size属性设置按钮的大小，可选值有small、normal、large。
    `)
};

export {
    radioButtonSize,
    radioButton,
    change,
    groupDisabled,
    radioGroup,
    card,
    disabled,
    desc,
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
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [],
};