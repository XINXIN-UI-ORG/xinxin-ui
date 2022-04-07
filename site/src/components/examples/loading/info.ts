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

export {
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