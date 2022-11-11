import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        基础表单通过x-form包裹，使用x-form-item包裹输入项作为容器。
    `)
};

const size: ExampleInfo = {
    title: "尺寸控制",
    desc: format(`
        可以通过size控制表单的尺寸，同时设置label-position可以控制label的位置。
    `)
};

const validation: ExampleInfo = {
    title: "表单验证",
    desc: format(`
        表单可以提供校验用户输入的功能，只需在form的rules中传入验证的规则，并在form-item中加入rule-name中加上需要验证的规则名称即可。
    `)
};

const addItem: ExampleInfo = {
    title: "添加/删除表单项",
    desc: format(`
        动态添加或删除单个表单字段的验证规则规则。
    `)
};

export {
    addItem,
    validation,
    base,
    size,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "Form标签属性",
            describe: "--------------------",
            type: "--------------------",
        },
        {
            props: "label-position",
            describe: "文字描述的位置",
            type: 'String',
            defaultValue: "left",
            selectList: ["left", "right", "top"],
        },
        {
            props: "size",
            describe: "表单尺寸",
            type: 'String',
            defaultValue: "normal",
            selectList: ["small", "normal", "large"],
        },
        {
            props: "rules",
            describe: "表单验证规则",
            type: 'Object',
            defaultValue: "{}",
        },
        {
            props: "FormItem标签属性",
            describe: "--------------------",
            type: "--------------------",
        },
        {
            props: "label",
            describe: "字段名称",
            type: 'String',
        },
        {
            props: "rule-name",
            describe: "字段验证规则名称",
            type: 'String',
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};