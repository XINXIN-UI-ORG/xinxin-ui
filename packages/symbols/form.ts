import type { InjectionKey, Ref } from "vue";

export interface FormContext {
    // 计算form内所有label的最大宽度
    autoMaxLabelWidth: string;
    // 注册label的宽度
    registerLabelWidth: (newVal: number, oldVal: number) => void;
    // 注销label的宽度
    cancellationLabelWidth: (val: number) => void;
    // 注册label对象
    registerLabel: (labelRef: Ref<HTMLLabelElement>) => void;
    // 注销label对象
    cancellationLabel: (labelRef: Ref<HTMLLabelElement>) => void;
    // 更新所有的label
    updateAllLabelWidth: (width: string) => void;

    labelPosition: String;
};

export const FormKey: InjectionKey<FormContext> = Symbol("xForm");
