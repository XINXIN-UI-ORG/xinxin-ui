import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const targetLoad: ExampleInfo = {
    title: "在目标处加载",
    desc: format(`
        当某块区域无法立即展示数据时，可以使用load组件，不至于让用户太枯燥。
        导入XLoad组件，初始化描述信息，并使用show方法展示加载组件，如果想要在指定地方加载，传入对应的dom对象即可。
    `)
};

export {
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
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [],
};