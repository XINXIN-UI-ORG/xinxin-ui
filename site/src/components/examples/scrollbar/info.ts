import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        设置max-height来限制高度从而出现滚动条，如果不设置则默认500像素。
    `)
};

const horizontal: ExampleInfo = {
    title: "横向滚动",
    desc: format(`
        设置max-height来限制高度从而出现滚动条，如果不设置则默认500像素。
    `)
};

export {
    horizontal,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "max-height",
            describe: "设置滚动条最大高度",
            type: 'Number | String',
            defaultValue: "500px"
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};