import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        通过options将x-select的可选值传入，options是一个数组，数组每项是一个对象，对象中可传入label和value，同时使用v-model绑定变量，
        当用户选中其中的项时，x-select会将options中对应的value赋值给v-model绑定的变量，其次通过设置options中每一项中的disabled为true可禁用其中某一项。
    `)
};

export {
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
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};