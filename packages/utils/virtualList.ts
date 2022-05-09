import { UnwrapNestedRefs } from "vue";

export type ContainerState = {
    height: number,
    translate: number,
};

export class VirtualList<T> {
    item_height: number = 38;
    private _dataList: Array<T>;

    private _viewPortHeight: number;

    constructor(viewPortHeight: number) {
        this._dataList = [];
        this._viewPortHeight = viewPortHeight;
    }

    get dataList(): T[] {
        return this._dataList;
    }

    set dataList(list: T[]) {
        this._dataList = list;
    }

    public updateDataList(scrollTop: number, containerState: UnwrapNestedRefs<ContainerState>): Array<T> {
        if (!this.isVirtualList()) {
            return this._dataList;
        }
        // 获取起始跟结束idindex
        let startIndex = this.startIndex(scrollTop);
        let endIndex = this.endIndex(startIndex);
        console.log(scrollTop, startIndex);
        // 更新容器的高度和偏移量
        containerState.height = this.getContainerHeight();
        containerState.translate = this.getTranslate(startIndex);
        return this._dataList.slice(startIndex, endIndex);
    }

    private getContainerHeight(): number {
        return this._dataList.length * this.item_height;
    }

    private getTranslate(index: number): number {
        return index * this.item_height;
    }

    /**
     * 获取当前滚动条对应需要渲染的列表的起始index
     * @param scrollTop 
     * @returns 
     */
    private startIndex(scrollTop: number) {
        return Math.floor(scrollTop / this.item_height);
    }

    private endIndex(startIndex: number) {
        return startIndex + Math.ceil(this._viewPortHeight / this.item_height);
    }

    public isVirtualList(): boolean {
        return this._dataList.length > 100;
    }
}
