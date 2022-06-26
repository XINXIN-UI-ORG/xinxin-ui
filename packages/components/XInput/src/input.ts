import { inject } from "vue";
import type { ExtractPropTypes, PropType } from "vue";
import { FormItemToComponentKey } from "@xinxin-ui/symbols";
import { NormalSize } from "@xinxin-ui/typings";

export const inputProps = {
    size: {
        type: String as PropType<NormalSize>,
        default: "normal",
    },
    modelValue: {
        type: [String, Number],
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    clearable: {
        type: Boolean,
        default: false,
    },
    showPasswordOn: {
        type: String,
        default: undefined,
    },
    status: {
        type: String,
        default: undefined,
    },
    placeholder: {
        type: String,
        default: "",
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    // inner props
    _cursor: {
        type: Boolean,
        default: false,
    },
    _hiddenInput: {
        type: Boolean,
        default: false,
    },
};

export function useInput(
    props: ExtractPropTypes<typeof inputProps>
): any {
    const xFormItem = inject(FormItemToComponentKey, {
        size: props.size,
    });

    return {
        xFormItem,
    };
}

