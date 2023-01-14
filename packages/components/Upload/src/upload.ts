import { ExtractPropTypes, PropType, SetupContext, Ref, reactive } from 'vue';
import { ref, provide, watch } from 'vue';
import { uniqueId, cloneDeep } from 'lodash';
import { UploadKey } from '@xinxin-ui/symbols';
import { UploadFile, FileUploadEnum, ListType } from '@xinxin-ui/typings';
import type { AXE_METHOD } from '@xinxin-ui/http';
import axios from 'axios';

export const uploadProps = {
  uploadText: {
    type: String,
    default: '点击上传',
  },
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => reactive<UploadFile[]>([]),
  },
  limit: {
    type: Number as PropType<number | null>,
    default: null,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  action: {
    type: String,
    default: '',
  },
  method: {
    type: String as PropType<AXE_METHOD>,
    default: 'GET',
  },
  fileName: {
    type: String,
    default: 'file',
  },
  beforeRemove: {
    type: Function as PropType<(file: UploadFile, fileList: UploadFile[]) => Promise<void> | boolean>,
    default: null,
  },
  replace: {
    type: Boolean,
    default: false,
  },
  prompt: {
    type: String,
    default: '',
  },
  promptPosition: {
    type: String as PropType<'right' | 'left' | 'bottom'>,
    default: 'right',
  },
  beforeUpload: {
    type: Function as PropType<(file: File) => Promise<void> | boolean>,
    default: null,
  },
  listType: {
    type: String as PropType<ListType>,
    default: 'card',
  },
  drag: {
    type: Boolean,
    default: false,
  },
};

export const uploadEmits = {
  onExceed(files: FileList, fileList: UploadFile[]) {
    if (!files || !fileList) {
      return false;
    }

    return true;
  },
  onRemove(files: UploadFile, fileList: UploadFile[]) {
    if (!files || !fileList) {
      return false;
    }

    return true;
  },
};

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export function useUpload(
  props: UploadProps,
  emit: SetupContext<typeof uploadEmits>['emit'],
  fileInputRef: Ref<HTMLInputElement>,
) {
  const fileList = ref<UploadFile[]>([]);
  const dragOver = ref<boolean>(false);

  watch(
    props.fileList,
    (newFileList: UploadFile[]) => {
      fileList.value = newFileList.map(file => {
        const cloneFile = cloneDeep(file);
        const id = cloneFile.id ?? uniqueId('upload');
        file.id = id;
        return {
          id: id,
          ...cloneFile,
          isImage: !!file.type?.startsWith('image'),
          status: file.status || FileUploadEnum.SUCCESS,
        };
      });
    },
    {
      immediate: true,
      deep: true,
    }
  );

  const fileOnChange = (event: Event) => {
    // 获取上传的文件
    const files = (event.target as HTMLInputElement).files;
    if (!files) {
      return;
    }

    fileUpload(files);
  };

  const fileUpload = (files: FileList) => {
    if (props.limit && props.fileList.length + files.length > props.limit) {
      emit('onExceed', files, props.fileList);
      return;
    }

    const uploadFiles = Array.from(files);
    if (uploadFiles.length === 0) {
      return;
    }

    fileInputRef.value.value = '';
    uploadFiles.forEach((rawFile, index) => {
      if (props.replace && index !== 0) {
        return;
      }

      if (!(props.beforeUpload instanceof Function)) {
        upload(props, rawFile);
        return;
      }
  
      // 执行上传前检查
      const before = props.beforeUpload(rawFile);
      if (before instanceof Promise) {
        before.then(() => upload(props, rawFile));
      } else {
        before && upload(props, rawFile);
      }
    });
  };

  const handleRemove = (file: UploadFile) => {
    const doRemove = () => {
      // 如果当前图片正在发送请求 先终止发送
      file.cancelToken?.cancel();
      props.fileList.splice(props.fileList.findIndex(item => item.id === file.id), 1);
      emit('onRemove', file, props.fileList);
      if (file.url && file.url.includes('blob:')) {
        URL.revokeObjectURL(file.url);
      }
    };

    if (!props.beforeRemove) {
      doRemove();
    } else {
      const before = props.beforeRemove(file, fileList.value);
      if (before instanceof Promise) {
        before.then(() => doRemove());
      } else {
        before && doRemove();
      }
    }
  };

  const dragDrop = (event: DragEvent) => {
    dragOver.value = false;
    const files = event.dataTransfer?.files;
    if (!files) {
      return;
    }

    fileUpload(files);
  };

  const submit = () => {
    fileList.value
    .filter(file => file.status === FileUploadEnum.READY)
    .forEach(file => post(file.raw!, file, props));
  };

  provide(UploadKey, {
    fileList,
    handleRemove,
    listType: props.listType,
  });

  return {
    fileOnChange,
    fileList,
    dragOver,
    dragDrop,
    submit,
  };
}

/**
 * 处理文件上传逻辑
 * 
 * @param props 组件参数 
 * @param rawFile 当前上传的文件
 */
function upload(props: UploadProps, rawFile: File) {
  const file = convertFile(rawFile);
  if (props.replace) {
    const uploadDelay = props.fileList.length ? 500 : 0;

    // 移除之前的文件并添加新的文件 动画需要 延迟500ms再上传新的文件
    props.fileList.length = 0;
    setTimeout(() => {
      props.fileList.push(file);
    }, uploadDelay);

  } else {
    props.fileList.push(file);
    
    if (props.autoUpload) {
      post(rawFile, file, props);
    }
  }
}

/**
 * 将文件上传到服务器
 * 
 * @param file 待上传的文件 
 * @param uploadFile 格式化后的文件
 * @param props 组件参数
 */
function post(file: File, uploadFile: UploadFile, props: UploadProps) {
  const data = new FormData();
  data.append(props.fileName, file);

  // 上传文件
  const cancelToken = axios.CancelToken.source();
  axios({
    url: props.action,
    method: props.method,
    data,
    cancelToken: cancelToken.token,
    onUploadProgress(progress) {
      setStatus(uploadFile.id!, props, FileUploadEnum.PROGRESS, Math.round(progress.loaded / (progress.total ?? 0) * 100));
    },
  }).then(res => {
    setTimeout(() => {
      setStatus(uploadFile.id!, props, FileUploadEnum.SUCCESS);
    }, 300);
  }).catch(() => {
    setTimeout(() => {
      setStatus(uploadFile.id!, props, FileUploadEnum.FAIL);
    }, 300);
  });
  uploadFile.cancelToken = cancelToken;
}

function setStatus(currentId: string, props: UploadProps, status: FileUploadEnum, progress?: number) {
  const currentUploadFile = props.fileList.find(item => item.id === currentId);
  if (!currentUploadFile) {
    return;
  }
  
  if (progress) {
    currentUploadFile.progress = progress;
  }

  currentUploadFile.status = status;
}

/**
 * 将上传的文件转换成Upload组件的格式
 * 
 * @param file 待转化的文件
 * @returns 
 */
function convertFile(file: File) {
  const converItem: UploadFile = {
    name: file.name,
    size: parseFloat((file.size / 1024).toFixed(2)),
    type: file.type,
    isImage: true,
    id: uniqueId('upload'),
    progress: 0,
    status: FileUploadEnum.READY,
    raw: file,
  };

  if (file.type.startsWith('image')) {
    converItem.url = URL.createObjectURL(file);
  }

  return converItem;
}
