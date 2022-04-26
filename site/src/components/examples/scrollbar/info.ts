import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        设置max-height来限制高度从而出现滚动条。
    `)
};

const horizontal: ExampleInfo = {
    title: "横向滚动",
    desc: format(`
        设置horizontal属性开启横向滚动，x-scrollbar自适应父级容器的宽度，如果内容超过了该宽度则出现横向滚动条。
    `)
};

const scrollTo: ExampleInfo = {
    title: "指定滚动位置",
    desc: format(`
        通过组件暴露出来的scrollTo方法可以手动设置滚动条滚动到的位置，传入一个对象，对象中支持设置top跟left值。
    `)
};

export {
    scrollTo,
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
        {
            props: "color",
            describe: "设置滚动条的颜色",
            type: 'String',
            defaultValue: "#bfbfbf"
        },
        {
            props: "hover-color",
            describe: "设置鼠标移动到滚动条上时滚动条的颜色",
            type: 'String',
            defaultValue: "#999"
        },
        {
            props: "horizontal",
            describe: "设置允许横向滚动",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "getContainerDom",
            describe: "获取滚动容器的dom对象",
            result: ["HTMLDivElement"]
        },
        {
            event: "scrollTo",
            describe: "将滚动条滚动到指定位置，可设置左侧偏移量和顶部偏移量。",
            props: ["{ left?: number, top?: number }"]
        },
    ],
};