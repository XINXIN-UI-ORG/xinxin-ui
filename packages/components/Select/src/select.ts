import { ModelValueType, NormalSize } from "@xinxin-ui/typings";
import { PropType } from "vue";

export const selectProps = {
    options: {
        type: Array as PropType<Array<OptionItem>>,
        default: [],
    },
    size: {
        type: String as PropType<NormalSize>,
        default: "normal",
    },
    suffix: {
        type: String,
        default: "Select",
    },
};

type OptionItem = {
    label: string,
    value: ModelValueType,
    disabled: boolean,
};
