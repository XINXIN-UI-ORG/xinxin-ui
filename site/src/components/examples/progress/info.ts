import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        提供content来自定义弹出的内容，使用placement来设置popover弹出位置，格式为[方向]-[位置]，
        方向有四个值top、right、bottom、left可供选择，位置有三个值start、end、空可供选择，所以placement一共有12个值可选。
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
            props: "content",
            describe: "popover弹出的内容",
            type: 'String',
            defaultValue: "xinxin-ui"
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