import type { PropType, SetupContext } from "vue";
import type { OptionItem, SelectValue } from "./select";

export const selectMenuProps = {
    optionList: {
        type: Array as PropType<Array<OptionItem>>,
        default: [] as OptionItem[],
    },
    selectValues: {
        type: Array as PropType<SelectValue[]>,
        default: [] as SelectValue[],
    },
};

export const selectMenuEmits = {
    changeSelect: null,
};

export function useSelectMenu(
    emit: SetupContext<typeof selectMenuEmits>['emit']
) {
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
}