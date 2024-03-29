import { inject, watch } from "vue";
import type { ExtractPropTypes, PropType } from "vue";
import { FormItemKey } from "@xinxin-ui/symbols";
import { NormalSize, TriggerEnum } from "@xinxin-ui/typings";

export const inputProps = {
    size: {
        type: String as PropType<NormalSize>,
        default: 'normal',
    },
    modelValue: {
        type: [String, Number],
        default: '',
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
        default: 'none',
    },
    placeholder: {
        type: String,
        default: '',
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
    const xFormItem = inject(FormItemKey, {
        size: props.size,
    });

    watch(
        () => props.modelValue,
        () => {
            xFormItem.validate?.(TriggerEnum.change);
        },
    );

    return {
        xFormItem,
    };
}

