import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        使用v-model绑定变量，如果radio被选中，会将value的值赋值给v-model绑定的变量，value可以是Number，String，Boolean。
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
            props: "value",
            describe: "radio的value值，当radio被选中时，该value会被设置给v-model绑定的变量。",
            type: 'Boolean | Number | String',
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
    ],
};