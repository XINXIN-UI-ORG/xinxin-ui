import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const targetLoad: ExampleInfo = {
    title: "在目标处加载",
    desc: format(`
        当某块区域无法立即展示数据时，可以使用load组件，不至于让用户太枯燥。
        导入XLoad组件，初始化描述信息，并使用show方法展示加载组件，如果想要在指定地方加载，传入对应的dom对象即可。
    `)
};

const closeAndDestory: ExampleInfo = {
    title: "关闭和销毁",
    desc: format(`
        通过调用close和destroy方法可以关闭和销毁加载组件，关闭后可通过show方法再次展示加载组件，销毁后则不能再展示加载组件。
    `)
};

const customerText: ExampleInfo = {
    title: "自定义加载文字",
    desc: format(`
        通过description可以配置加载组件下面的文字。
    `)
};

const noText: ExampleInfo = {
    title: "无文字加载",
    desc: format(`
        不给XLoad传入任何值则触发无文字加载。
    `)
};

const customerColor: ExampleInfo = {
    title: "自定义颜色",
    desc: format(`
        通过color传入颜色实现图标和文字的自定义。
    `)
};

const iconSize: ExampleInfo = {
    title: "图标大小",
    desc: format(`
        通过iconSize设置图标尺寸，可枚举的值有small、medium、large。
    `)
};

const fullScreenLoad: ExampleInfo = {
    title: "全屏加载",
    desc: format(`
        在调用show方法时不传入任何dom，则会触发全屏加载。
    `)
};

const alpha: ExampleInfo = {
    title: "透明度",
    desc: format(`
        通过alpha设置背景透明度，支持从0至1选择。
    `)
};

export {
    alpha,
    fullScreenLoad,
    iconSize,
    customerColor,
    noText,
    customerText,
    closeAndDestory,
    targetLoad,
    apiProps,
    apiEvent
}


const apiProps: ApiTable<ApiProps> = {
    header: ['属性', '说明', '类型', '默认值', '可选值'],
    content: [
        {
            props: "description",
            describe: "加载提示文字",
            type: 'String',
        },
        {
            props: "alpha",
            describe: "背景透明度，支持0-1的小数",
            type: 'Number',
            defaultValue: "1",
            selectList: ["0-1的小数"]
        },
        {
            props: "color",
            describe: "定义图标和文字颜色",
            type: 'String',
            defaultValue: "#f5a31f",
            selectList: ["颜色字面量", "16进制", "RGB", "RGBA", "HSL", "HSLA"]
        },
        {
            props: "iconSize",
            describe: "图标尺寸",
            type: 'String',
            defaultValue: "small",
            selectList: ["small", "medium", "large"]
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "show",
            describe: "展示加载组件",
            props: ["target"],
        },
        {
            event: "close",
            describe: "关闭加载组件",
        },
        {
            event: "destroy",
            describe: "销毁加载组件",
            props: ["callback"],
        },
    ],
};