import { ExtractPropTypes } from "vue";

export const checkboxProps = {
    modelValue: {
        type: [Number, Boolean, String],
        default: undefined,
    },
    label: {
        type: String,
        default: "xinxin-ui"
    },
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

