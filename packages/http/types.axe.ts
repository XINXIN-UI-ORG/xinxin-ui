export type AXE_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface AxeOption {
    /**
     * 请求链接
     */
    url: string;

    /**
     * 请求头信息
     */
    headers?: { [propName: string]: any },

    /**
     * 请求方式
     */
    method: AXE_METHOD,

    /**
     * 请求数据
     */
    data?: { [propName: string]: any },

    /**
     * 请求文件
     */
    files?: { [propName: string]: File | FileList },

    /**
     * 请求初始化参数
     */
    init?: { [propName: string]: string },
};
