import { UnwrapNestedRefs } from "vue";

export type ContainerState = {
    height: string,
    translate: string,
};

/**
 * 列表项数据缓存
 */
type ListItemCache = {
    // 当前项的索引
    index: number;
    // 当前项的高度
    selfHeight: number;
    // 当前项距离顶部的高度
    offset: number;
};

export class VirtualList<T> {
    /**
     * 待展示的所有元素
     */
    private _dataList: T[] = [];

    public setDataList(list: T[]) {
        this._dataList = [];
        this._listDataCaches = [];

        // 转换list 编上index
        list.forEach((item, index) => {
            (item as any).index = index;
            this._dataList.push(item);
        });
        this.initCache();
    }

    /**
     * 视口高度
     */
    private _viewPortHeight: number;

    /**
     * 列表项的数据缓存
     */
    private _listDataCaches: Array<ListItemCache> = [];

    private defaultItemHeight = 30;

    constructor(viewPortHeight: number) {
        this._viewPortHeight = viewPortHeight;
    }

    /**
     * 初始化缓存信息
     */
    private initCache(): void {
        let offset = 0;
        for (let i = 0; i < this._dataList.length; i++) {
            this._listDataCaches.push({
                index: i,
                selfHeight: this.defaultItemHeight,
                offset,
            });
            offset += this.defaultItemHeight;
        }
    }

    /**
     * 根据滚动条高度实时更新待展示的list
     * @param scrollTop 
     * @param containerState 
     * @returns 
     */
    public updateDataList(scrollTop: number, containerState: UnwrapNestedRefs<ContainerState>): T[] {
        if (!this.isVirtualList()) {
            containerState.height = 'auto';
            containerState.translate = '0';
            return this._dataList;
        }

        // 获取起始跟结束index
        let startIndex = this.findFirstIndex(scrollTop);
        let endIndex = this.findFirstIndex(scrollTop + this._viewPortHeight);

        // 更新容器的高度和偏移量
        containerState.height = `${this.getContainerHeight()}px`;
        containerState.translate = `${this._listDataCaches[startIndex].offset}px`;
        return this._dataList.slice(startIndex, Math.min(endIndex + 1, this._dataList.length));
    }

    /**
     * 滚动区域总高度
     * @returns { number }
     */
    private getContainerHeight(): number {
        const lastItem = this._listDataCaches[this._listDataCaches.length - 1];
        return lastItem.offset + lastItem.selfHeight;
    }

    /**
     * 计算滚动到指定高度时应该显示的第一个元素索引
     * @param height
     * @returns 
     */
    private findFirstIndex(height: number) {
        // 二分查找元素
        let low = 0;
        let high = this._dataList.length - 1;
        while (low <= high) {
            let middle = Math.floor((high + low) / 2);
            let middleCache = this._listDataCaches[middle];
            if (this.isTargetLine(middleCache, height)) {
                return middle;
            } else if (this.isAboveLine(middleCache, height)) {
                low = middle + 1;
            } else {
                high = middle - 1;
            }
        }
        return high;
    }

    private isTargetLine(middleCache: ListItemCache, height: number): boolean {
        return middleCache.offset <= height && middleCache.offset + middleCache.selfHeight >= height;
    }

    private isBelowLine(middleCache: ListItemCache, height: number): boolean {
        return middleCache.offset > height;
    }
    
    private isAboveLine(middleCache: ListItemCache, height: number): boolean {
        return middleCache.offset + middleCache.selfHeight < height;
    }

    public isVirtualList(): boolean {
        return this._dataList.length > 100;
    }

    public updateCache(index: number, height: number): void {
        const dataItem = this._listDataCaches[index];
        if (dataItem) {
            dataItem.selfHeight = height;
            this._listDataCaches[index] = dataItem;
            
            // 向后更新offset
            for (let i = index + 1; i < this._listDataCaches.length; i++) {
                const prevItem = this._listDataCaches[i - 1];
                const currentItem = this._listDataCaches[i];
                currentItem.offset = prevItem.offset + prevItem.selfHeight;
            }
        }
    }
}
