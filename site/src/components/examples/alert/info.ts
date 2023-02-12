import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        展示告警信息。
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
            props: 'type',
            describe: '弹窗类型',
            type: 'error | warngin | success | info',
            defaultValue: 'info',
        },
        {
            props: 'message',
            describe: '弹窗消息',
            type: 'String',
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "popoverScroll",
            describe: "当popover被限制高度后会出现滚动条，该事件可以监听到popover内的滚动。",
            props: ["scrollPosition"],
        },
    ],
};