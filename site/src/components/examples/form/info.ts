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

export {
    base,
    size,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
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
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};