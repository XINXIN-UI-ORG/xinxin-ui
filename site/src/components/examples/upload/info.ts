import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
    title: "基础使用",
    desc: format(`
        最基础的上传组件用法，通过设置upload-text可以自定义上传文件的内容，通过limit和on-exceed可以限制文件上传个数和定义超出限制时的行为。
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
            props: "type",
            describe: "tag的类型",
            type: 'String',
            defaultValue: "default",
            selectList: ["default", "info", "success", "warning", "error"],
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "close",
            describe: "点击关闭按钮触发事件",
        },
    ],
};