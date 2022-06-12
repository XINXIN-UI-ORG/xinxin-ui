import type { InjectionKey } from "vue";

export interface FormContext {
    // 计算form内所有label的最大宽度
    autoMaxLabelWidth: string;
    // 注册label的宽度
    registerLabelWidth: (newVal: number, oldVal: number) => void;
    // 注销label的宽度
    cancellationLabelWidth: (val: number) => void;
};

export const FormKey: InjectionKey<FormContext> = Symbol("xForm");
