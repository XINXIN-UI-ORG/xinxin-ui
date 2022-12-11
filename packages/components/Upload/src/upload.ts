import type { ExtractPropTypes, PropType, SetupContext, Ref } from 'vue';
import { ref, provide, watch } from 'vue';
import { uniqueId, cloneDeep } from 'lodash';
import { UploadKey } from '@xinxin-ui/symbols';
import { UploadFile, FileUploadEnum } from '@xinxin-ui/typings';
import type { AXE_METHOD } from '@xinxin-ui/http';
import axios from 'axios';

export const uploadProps = {
  uploadText: {
    type: String,
    default: '点击上传',
  },
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => [] as UploadFile[],
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
};

export const uploadEmits = {
  onExceed(files: FileList, fileList: UploadFile[]) {
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
  watch(
    props.fileList,
    (newFileList: UploadFile[]) => {
      fileList.value = newFileList.map(file => {
        const cloneFile = cloneDeep(file);
        return {
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

    if (props.limit && props.fileList.length + files.length > props.limit) {
      emit('onExceed', files, props.fileList);
      return;
    }

    const uploadFiles = Array.from(files);
    if (uploadFiles.length === 0) {
      return;
    }

    uploadFiles.forEach(itemFile => {
      const file = convertFile(itemFile);
      props.fileList.push(file);

      if (props.autoUpload) {
        fileInputRef.value.value = '';
        upload(itemFile, file, props);
      }
    });
  };
  provide(UploadKey, {
    fileList,
  });

  return {
    fileOnChange,
  };
}

/**
 * 上传文件
 */
function upload(file: File, uploadFile: UploadFile, props: UploadProps) {
  const data = new FormData();
  data.append(props.fileName, file);

  // 上传文件
  axios({
    url: props.action,
    method: props.method,
    data,
    onUploadProgress(progress) {
      setStatus(uploadFile.id!, props, FileUploadEnum.PROGRESS, Math.round(progress.loaded / (progress.total ?? 0) * 100));
    },
  }).then(res => {
    setStatus(uploadFile.id!, props, FileUploadEnum.SUCCESS);
    console.log('解析成功', res);
  }).catch(() => {
    setStatus(uploadFile.id!, props, FileUploadEnum.FAIL);
  });
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
  };

  if (file.type.startsWith('image')) {
    converItem.url = URL.createObjectURL(file);
  }

  return converItem;
}
