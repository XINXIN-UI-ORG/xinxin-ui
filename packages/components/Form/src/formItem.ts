import type { ExtractPropTypes } from "vue";

export const formItemProps = {
    label: {
        type: String,
        default: "",
    },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;