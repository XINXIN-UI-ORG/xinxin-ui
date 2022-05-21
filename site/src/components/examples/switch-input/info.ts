import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        绑定v-model到一个Boolean类型的变量。可以使用active-color属性与inactive-color属性来设置开关的背景色。
    `)
};

const size: ExampleInfo = {
    title: "尺寸",
    desc: format(`
        通过size尺寸可以设置x-switch的大小，有small、normal、large可选。
    `)
};

const content: ExampleInfo = {
    title: "文字描述",
    desc: format(`
        使用active-text属性与inactive-text属性来设置开关的文字描述。
    `)
};

const disabled: ExampleInfo = {
    title: "禁用",
    desc: format(`
        使用disabled属性来设置switch的禁用状态。
    `)
};

const loading: ExampleInfo = {
    title: "加载中",
    desc: format(`
        使用loading属性来设置switch的加载状态。
    `)
};

export {
    loading,
    disabled,
    content,
    size,
    base,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "active-color",
            describe: "switch激活时的颜色",
            type: 'String',
            defaultValue: "#f5a31f",
        },
        {
            props: "inactive-color",
            describe: "switch未激活时的颜色",
            type: 'String',
            defaultValue: "#dcdfe6",
        },
        {
            props: "size",
            describe: "switch的尺寸",
            type: 'String',
            defaultValue: "normal",
            selectList: ['small', 'normal', 'large'],
        },
        {
            props: "active-text",
            describe: "激活时的文字提示",
            type: 'String',
        },
        {
            props: "inactive-text",
            describe: "未激活时的文字提示",
            type: 'String',
        },
        {
            props: "disabled",
            describe: "禁用switch",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
        {
            props: "loading",
            describe: "显示加载状态",
            type: "Boolean",
            defaultValue: "false",
            selectList: ["true", "false"],
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};