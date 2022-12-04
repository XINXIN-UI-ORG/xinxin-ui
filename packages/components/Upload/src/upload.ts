import type { ExtractPropTypes } from 'vue';
import { reactive } from 'vue';
import { uniqueId } from 'lodash';

export const uploadProps = {
    uploadText: {
        type: String,
        default: '点击上传',
    },
};

interface UploadFile {
    id: string;

    name: string;

    size: number;

    type: string;

    isImage: boolean;

    imageContent?: string;
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export function useUpload () {
    const fileList = reactive<UploadFile[]>([]);
    
    const fileOnChange = (event: Event) => {
        // 获取上传的文件
        const uploadTarget = event.target as HTMLInputElement;
        const uploadFiles = uploadTarget.files!;

        Object.values(uploadFiles).forEach(file => {
            const currentFile: UploadFile = {
                id: uniqueId('upload'),
                name: file.name,
                size: parseFloat((file.size / 1024).toFixed(2)),
                type: file.type,
                isImage: file.type.startsWith('image'),
            };
            fileList.push(currentFile);

            // 如果是图片 需要加载图片内容
            readAsUrl(file).then(src => fileList.find(item => item.id === currentFile.id)!.imageContent = src);
        });
    };
    
    return {
        fileOnChange,
        fileList,
    };
}

async function readAsUrl(file: File): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<string>(resolve => {
        reader.onload = () => {
            resolve(reader.result as string);
        };
    });
}
