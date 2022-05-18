import type { OptionItem, SelectValue } from "./select";
import type { PropType, SetupContext, Ref, ExtractPropTypes } from "vue";
import { onMounted, onUnmounted } from "vue";

export const selectItemProps = {
    data: Object as PropType<OptionItem>,
    selectValues: {
        type: Array as PropType<SelectValue[]>,
        default: [] as SelectValue[],
    },
    index: {
        type: Number,
        default: 0,
    },
};

export const selectItemEmits = {
    changeSelect: null,
    updateCache: null,
};

export function useSelectItem(
    emit: SetupContext<typeof selectItemEmits>['emit'],
    selectItemRef: Ref<HTMLDivElement | undefined>,
    props: ExtractPropTypes<typeof selectItemProps>,
) {
    onMounted(() => {
        if (selectItemRef.value) {
            const unObserve = observe(props.index, selectItemRef.value, emit);
        
            onUnmounted(() => {
                unObserve();
            });
        }
    });
    return {
        selectItemClick(e: Event, value: SelectValue, disabled: boolean) {
            // 触发select选中或者移除当前点击项
            emit("changeSelect", {
                e,
                value,
                disabled,
            });
        },
    };
};

function observe(
    index: number,
    selectItemDom: HTMLDivElement,
    emit: SetupContext<typeof selectItemEmits>['emit']
): () => void {
    const resizeObserver = new ResizeObserver(() => {
        // 更新缓存中的数据
        emit("updateCache", {
            index,
            height: selectItemDom.clientHeight,
        });
    });

    resizeObserver.observe(selectItemDom);
    return () => resizeObserver.disconnect();
}