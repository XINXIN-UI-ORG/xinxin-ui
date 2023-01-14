import type { CancelTokenSource } from 'axios';

export enum FileUploadEnum {
    READY = 'ready',
    PROGRESS = 'progress',
    FAIL = 'fail',
    SUCCESS = 'success',
}

export interface UploadFile {
    id?: string;

    isImage?: boolean;

    name: string;

    url?: string;

    size: number;

    type?: string;

    status?: FileUploadEnum;

    progress?: number;

    cancelToken?: CancelTokenSource;
    
    raw?: File;
};

export type ListType = 'card' | 'picture';