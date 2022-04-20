import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        当页面滑动到一定位置出现。
    `)
};

const listenTarget: ExampleInfo = {
    title: "修改监听目标",
    desc: format(`
        该组件默认监听document的滚动，但是也可以监听其他dom元素的滚动，只需要将要监听的dom元素或者选择器设置给x-top即可。
    `)
};

const customerContent: ExampleInfo = {
    title: "自定义内容",
    desc: format(`
        x-top内置了插槽，除了使用默认内容还可以选择自定义。
    `)
};

export {
    customerContent,
    listenTarget,
    base,
    apiProps,
    apiEvent
}

const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: 'listen-element',
            type: "String | HTMLElement | Document",
            describe: "组件监听的对象",
            defaultValue: "document",
        },
        {
            props: 'bottom',
            describe: "组件距离页面底部距离",
            type: "Number | String",
            defaultValue: "50px",
        },
        {
            props: 'right',
            describe: "组件距离页面右部距离",
            type: "Number | String",
            defaultValue: "50px",
        },
        {
            props: 'visibility-height',
            describe: "页面滑动到指定距离显示组件",
            type: "Number",
            defaultValue: "200",
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};