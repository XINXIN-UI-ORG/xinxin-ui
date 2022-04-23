import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        提供content来自定义弹出的内容，使用placement来设置popover弹出位置，格式为[方向]-[位置]，
        方向有四个值top、right、bottom、left可供选择，位置有三个值start、end、空可供选择，所以placement一共有12个值可选。
    `)
};

const active: ExampleInfo = {
    title: "触发方式",
    desc: format(`
        使用trigger属性决定popover展示的触发方式，触发方式分别有：click、hover、focus、contextmenu，也可以直接通过show属性手动控制popover展示。
    `)
};

const showArrow: ExampleInfo = {
    title: "无箭头",
    desc: format(`
        设置show-arrow属性为false可以去除popover的箭头。
    `)
};

const theme: ExampleInfo = {
    title: "主题",
    desc: format(`
        通过theme可以定制主题，popover内置了light和dark两款主题，还可以通过自定义样式来切换主题。
    `)
};

const title: ExampleInfo = {
    title: "标题",
    desc: format(`
        通过title设置popover标题。
    `)
};

const maxHeight: ExampleInfo = {
    title: "最大高度",
    desc: format(`
        通过maxHeight设置popover可展示的最大高度，这在一些场景中很实用，譬如select。
    `)
};

export {
    maxHeight,
    title,
    theme,
    showArrow,
    active,
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
        {
            props: "placement",
            describe: "popover弹出的位置",
            type: 'String',
            defaultValue: "top",
            selectList: ["top", "top-start", "top-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end"],
        },
        {
            props: "theme",
            describe: "popover的样式",
            type: 'String',
            defaultValue: "light",
            selectList: ["light", "dark", "自定义"],
        },
        {
            props: "offset",
            describe: "popover距离目标元素的偏移量",
            type: 'Number',
            defaultValue: "12",
        },
        {
            props: "boundary",
            describe: `当popover向指定方向弹出时，如果该方向的可视区间边界距离目标的空间小于popover的大小，则popover会展示到相反或用户指定的方向，
            默认的可视区间按照document计算，可以通过此属性修改可视区间的对象。`,
            type: 'HTMLElement | Document',
            defaultValue: "document",
        },
        {
            props: "show",
            describe: '控制popover的展示，会使trigger属性失效',
            type: 'Boolean',
            defaultValue: "false",
            selectList: ['true', 'false'],
        },
        {
            props: "trigger",
            describe: '控制popover的展示方式',
            type: 'String',
            defaultValue: "click",
            selectList: ['click', 'hover', 'focus', 'contextmenu'],
        },
        {
            props: "show-arrow",
            describe: '控制popover是否展示箭头',
            type: 'Boolean',
            defaultValue: "true",
            selectList: ['true', 'false'],
        },
        {
            props: "ignore-content",
            describe: '当trigger设置为hover时，如果将该属性设置为true，则当鼠标移开触发元素时popover消失',
            type: 'Boolean',
            defaultValue: "false",
            selectList: ['true', 'false'],
        },
        {
            props: "title",
            describe: '为popover设置title',
            type: 'String',
        },
        {
            props: "maxHeight",
            describe: '为popover设置最大高度',
            type: 'String | Number',
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};