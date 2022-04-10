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

export {
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
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [],
};