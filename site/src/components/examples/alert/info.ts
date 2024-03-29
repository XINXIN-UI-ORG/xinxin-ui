import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        展示告警信息。
    `)
};

const simple: ExampleInfo = {
    title: "极简风格",
    desc: format(`
        style设置simple可以展示极简风格。
    `)
};

export {
    simple,
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
        {
            props: 'style',
            describe: '弹窗风格',
            type: 'technology | simple',
            defaultValue: 'technology',
        },
        {
            props: 'duration',
            describe: '弹窗持续时间',
            type: 'number',
            defaultValue: '3000',
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [],
};