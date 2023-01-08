import type { InjectionKey, Ref } from 'vue';
import type { UploadFile, ListType } from '@xinxin-ui/typings';

interface UploadContext {
    fileList: Ref<UploadFile[]>;

    handleRemove: (file: UploadFile) => void;

    listType: ListType,
};

export const UploadKey: InjectionKey<UploadContext> = Symbol('xUpload');