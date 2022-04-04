export type ExampleInfo = {
    title: string,
    desc: string
};

export interface ApiTable<T> {
    header: string[],
    content: Array<T>
}

export type ApiProps = {
    /**
     * 参数
     */
    props: string;
    /**
     * 说明
     */
    describe: string;
    /**
     * 类型
     */
    type: string;
    /**
     * 默认值
     */
    defaultValue?: string;
    /**
     * 可选值
     */
    selectList?: string[];
};

export type ApiEvent = {
    /**
     * 事件
     */
     event: string;
     /**
      * 说明
      */
     describe: string;
     /**
      * 返回值
      */
     result?: string[];
     /**
      * 形参
      */
     props?: string[];
};
