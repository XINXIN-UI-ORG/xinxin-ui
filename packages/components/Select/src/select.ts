import { ModelValueType } from "@xinxin-ui/typings";
import { PropType } from "vue";

export const selectProps = {
    options: {
        type: Array as PropType<Array<OptionItem>>,
        default: [],
    },
};

type OptionItem = {
    label: string,
    value: ModelValueType,
    disabled: boolean,
};
