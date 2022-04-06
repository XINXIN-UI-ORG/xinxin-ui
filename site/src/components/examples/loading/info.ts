import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础用法",
    desc: format(`
        消息提示可接收一个对象，通过message设置提示文字，通过type设置提示类型，类型分为info、success、warning、error，可以通过type属性设置。
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
            props: "message",
            describe: "消息提示文字",
            type: 'String',
            defaultValue: 'XinXin-UI Message!'
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [],
};