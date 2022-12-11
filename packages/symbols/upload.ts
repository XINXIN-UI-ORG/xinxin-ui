import type { InjectionKey, Ref } from 'vue';
import type { UploadFile } from '@xinxin-ui/typings';

interface UploadContext {
    fileList: Ref<UploadFile[]>;
};

export const UploadKey: InjectionKey<UploadContext> = Symbol('xUpload');