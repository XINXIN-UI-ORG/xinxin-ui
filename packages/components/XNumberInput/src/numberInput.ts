import { inject } from "vue";
import type { ExtractPropTypes } from "vue";
import { FormItemKey } from "@xinxin-ui/symbols";

export const numberInputProps = {
    numberButton: {
        type: Boolean,
        default: false,
    },
    step: {
        type: [String, Number],
        default: 1,
    },
    min: Number,
    max: Number,
};

export type NumberInputProps = ExtractPropTypes<typeof numberInputProps>;

export function useNumberInput(
    attrs: any,
) {
    const formItem = inject(FormItemKey, {
        size: attrs.size,
    });

    return {
        formItem,
    };
}
