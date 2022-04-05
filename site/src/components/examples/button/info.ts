import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础用法",
    desc: format(`
        按钮类型分为default、info、success、warning、error，可以通过type属性设置。
    `)
};

const second: ExampleInfo = {
    title: "二级按钮",
    desc: format(`
        二级按钮看起来淡一些，通过设置secondary实现。
    `)
};

const third: ExampleInfo = {
    title: "三级按钮",
    desc: format(`
        三级按钮会有灰色的背景，通过设置tertiary实现。
    `)
};

const fourth: ExampleInfo = {
    title: "四级按钮",
    desc: format(`
        四级按钮连灰色的背景都没有了，通过设置quaternary实现。
    `)
};

const dotted: ExampleInfo = {
    title: "虚线边框",
    desc: format(`
        加上了虚线边框，去除了背景，通过设置dashed实现。
    `)
};

const plain: ExampleInfo = {
    title: "透明背景",
    desc: format(`
        对背景做了一点小透明，通过设置plain实现。
    `)
};

const round: ExampleInfo = {
    title: "圆角按钮",
    desc: format(`
        有时候圆滑点也不错，通过设置round实现。
    `)
};

const circle: ExampleInfo = {
    title: "圆形按钮",
    desc: format(`
        不如圆滑到底吧，通过设置circle实现。
    `)
};

const ghost: ExampleInfo = {
    title: "无背景",
    desc: format(`
        没有背景似乎也很好看，通过设置ghost实现。
    `)
};

const icons: ExampleInfo = {
    title: "带图标的按钮",
    desc: format(`
        按钮配上图标可以更贴切的表达它的作用，通过在按钮中添加xinxin-icons的图标实现，按钮中有两类插槽，包括pre-icon和suf-icon，可以决定图标展示在文字前还是文字后。
    `)
};

const size: ExampleInfo = {
    title: "按钮尺寸",
    desc: format(`
        通过size属性可以设置按钮属性，分别有mini、small、normal、large等值可以设置。
    `)
};

const disabled: ExampleInfo = {
    title: "禁用按钮",
    desc: format(`
        通过disabled属性可以屏蔽按钮，实现禁用。
    `)
};

const loading: ExampleInfo = {
    title: "加载按钮",
    desc: format(`
        通过loading属性可以设置按钮是否加载。
    `)
};

const customer: ExampleInfo = {
    title: "自定义颜色",
    desc: format(`
        通过color属性传入自定义颜色，x-button会根据传入颜色自动计算hover和active颜色。
    `)
};

const block: ExampleInfo = {
    title: "块级按钮",
    desc: format(`
        通过设置block属性让按钮独占一行。
    `)
};

const buttonGroup: ExampleInfo = {
    title: "按钮组",
    desc: format(`
        使用x-button-group按钮包裹x-button可以实现将多个按钮合并在一起，设置direction为vertical或horizontal设置按钮排列的方向。
    `)
};

export {
    buttonGroup,
    block,
    customer,
    loading,
    disabled,
    apiProps,
    apiEvent,
    base,
    second,
    third,
    fourth,
    dotted,
    plain,
    round,
    circle,
    ghost,
    icons,
    size,
};


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "type",
            describe: "按钮类型。",
            type: 'String',
            defaultValue: 'default',
            selectList: ['default', 'info', 'success', 'warning', 'error'],
        },
        {
            props: "secondary",
            describe: "设置二级按钮",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "tertiary",
            describe: "设置三级按钮",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "quaternary",
            describe: "设置四级按钮",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "dashed",
            describe: "设置虚线边框",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "plain",
            describe: "设置透明背景",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "round",
            describe: "设置按钮圆角",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "circle",
            describe: "设置圆形按钮",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "ghost",
            describe: "设置无背景按钮",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "size",
            describe: "设置按钮属性",
            type: 'String',
            defaultValue: 'normal',
            selectList: ['mini', 'small', 'normal', 'large'],
        },
        {
            props: "disabled",
            describe: "设置按钮禁用",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "loading",
            describe: "设置按钮加载",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "color",
            describe: "自定义按钮颜色",
            type: 'String',
        },
        {
            props: "block",
            describe: "设置块级按钮",
            type: 'Boolean',
            defaultValue: 'false',
            selectList: ['true', 'false'],
        },
        {
            props: "pre-icon",
            describe: "前置图标",
            type: 'slot',
        },
        {
            props: "suf-icon",
            describe: "后置图标",
            type: 'slot',
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [],
};
