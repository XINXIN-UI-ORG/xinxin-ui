import { computed, ComputedRef } from "vue";

/**
 * 将group和组件自己相同属性的值合并
 * @param isGroup 是否是group模式
 * @param itemValue 组件自己的值
 * @param groupValue group的值
 * @returns ComputedRed<T>
 */
export function groupCombineItemStatus<T>(isGroup: boolean, itemValue: T, groupValue: T): ComputedRef<T> {
    return computed(() => {
        // 如果组件没有被group包裹或者自己有值则采用组件自己的值
        if (!isGroup || itemValue) {
            return itemValue;
        }
        // 否则使用group的值
        return groupValue;
    });
}