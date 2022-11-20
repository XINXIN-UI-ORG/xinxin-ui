import type { ExtractPropTypes } from 'vue';

export const uploadProps = {
    uploadText: {
        type: String,
        default: '正在上传',
    },
};

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export function useUpload() {
    const fileOnChange = () => {
        alert(123);
    };
    
    return {
        fileOnChange,
    };
}
