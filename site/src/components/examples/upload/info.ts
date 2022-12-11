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
            props: "limit",
            describe: "上传文件个数限制，不设置时无限制",
            type: 'Number | null',
            defaultValue: "null",
        },
        {
            props: 'v-model:file-list',
            describe: '初始化文件列表',
            type: 'Ref<UploadFile[]>',
            defaultValue: '[]',
        },
        {
            props: 'action',
            describe: '文件上传的链接',
            type: 'String',
        },
        {
            props: 'method',
            describe: '上传方式',
            type: 'GET | POST | PUT | DELETE',
            defaultValue: 'GET',
        },
        {
            props: 'file-name',
            describe: '上传文件名称',
            type: 'String',
            defaultValue: 'file',
        },
    ],
};

const apiEvent: ApiTable<ApiEvent> = {
    header: ['事件名', '说明', '返回值', '参数'],
    content: [
        {
            event: "on-exceed",
            describe: "文件上传超过限制时的回调",
            result: ['void'],
            props: ['file: FileList; 本次选中的文件', 'fileList: UploadFile[]; 已经上传的文件'],
        },
    ],
};