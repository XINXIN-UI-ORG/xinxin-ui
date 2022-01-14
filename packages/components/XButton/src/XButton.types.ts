export type ButtonType = "default" | "info" | "success" | "warning" | "error";

export type ButtonSize = "mini" | "small" | "normal" | "large";

export type ResultType = {
    clickBtn: (e: MouseEvent) => void,
    [propName: string]: any
};
