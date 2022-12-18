import type { InjectionKey, Ref } from 'vue';
import type { UploadFile } from '@xinxin-ui/typings';

interface UploadContext {
    fileList: Ref<UploadFile[]>;

    handleRemove: (file: UploadFile) => void;
};

export const UploadKey: InjectionKey<UploadContext> = Symbol('xUpload');