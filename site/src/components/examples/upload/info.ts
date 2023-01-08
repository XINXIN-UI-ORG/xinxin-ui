import { ExampleInfo, ApiTable, ApiProps, ApiEvent } from "../example.typing";
import { format } from "../../../utils";

const base: ExampleInfo = {
  title: "基础使用",
  desc: format(`
    最基础的上传组件用法，通过设置upload-text可以自定义上传文件的内容，通过limit和on-exceed可以限制文件上传个数和定义超出限制时的行为。
  `),
};

const replace: ExampleInfo = {
  title: "覆盖上传",
  desc: format(`
    通过设置replace为true可以开启替换模式，后上传的文件可以替换之前上传的文件。同时可以通过prompt和prompt-position可以设置提示文字以及文字显示位置。
  `),
};

const limit: ExampleInfo = {
  title: "上传前限制",
  desc: format(`
    通过设置before-upload钩子来限制用户上传的文件格式和大小。
  `),
};

const picture: ExampleInfo = {
  title: "图片墙",
  desc: format(`
    通过设置listType为picture来切换图片墙模式，当上传的文件达到了设置的limit上限，上传入口会自动隐藏。
  `),
};

const drag: ExampleInfo = {
  title: "拖拽上传",
  desc: format(`
    通过设置drag为true实现拖拽上传，你可以将文件拖拽到特定区域以进行上传。
  `),
};

export {
  drag,
  picture,
  limit,
  replace,
  base,
  apiProps,
  apiEvent
}


const apiProps: ApiTable<ApiProps> = {
  header: ['属性', '说明', '类型', '默认值', '可选值'],
  content: [
    {
      props: "upload-text",
      describe: "上传按钮的文字",
      type: 'String',
      defaultValue: "点击上传",
    },
    {
      props: "auto-upload",
      describe: "是否自动上传",
      type: 'Boolean',
      defaultValue: "true",
    },
    {
      props: "limit",
      describe: "上传文件个数限制，不设置时无限制",
      type: 'Number | null',
      defaultValue: "null",
    },
    {
      props: ':file-list | v-model:file-list',
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
    {
      props: 'replace',
      describe: '是否启用替换模式',
      type: 'Boolean',
      defaultValue: 'false',
    },
    {
      props: 'prompt',
      describe: '文字提示',
      type: 'String',
    },
    {
      props: 'prompt-position',
      describe: '文字提示位置',
      type: 'right | left | bottom',
      defaultValue: 'right',
    },
    {
      props: 'listType',
      describe: '图片模式',
      type: 'picture | card',
      defaultValue: 'card',
    },
    {
      props: 'drag',
      describe: '拖拽上传',
      type: 'Boolean',
      defaultValue: 'false',
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
    {
      event: "on-remove",
      describe: "删除文件时的回调",
      result: ['void'],
      props: ['file: UploadFile; 本次选中的文件', 'fileList: UploadFile[]; 已经上传的文件'],
    },
    {
      event: "before-remove",
      describe: "删除文件前的回调",
      result: ['void'],
      props: ['file: UploadFile; 本次选中的文件', 'fileList: UploadFile[]; 已经上传的文件'],
    },
    {
      event: "before-upload",
      describe: "上传文件前的回调，通过返回true或false来允许或阻止文件上传",
      result: ['boolean'],
      props: ['file: File; 本次选中的文件'],
    },
  ],
};