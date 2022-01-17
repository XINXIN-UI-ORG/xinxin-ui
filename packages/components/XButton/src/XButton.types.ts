import { ComputedRef } from "vue";

export type ButtonType = "default" | "info" | "success" | "warning" | "error";

export type ButtonSize = "mini" | "small" | "normal" | "large";

export type ResultType = {
    clickBtn: (e: MouseEvent) => void,
    disabled: ComputedRef<boolean>,
    disabledStyle: ComputedRef<{ [propsName: string]: string }>,
    [propName: string]: unknown
};
