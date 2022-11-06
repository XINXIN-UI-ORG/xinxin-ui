import type { InjectionKey, Ref } from "vue";
import type { FormRules, TriggerEnum, ValidateStatusEnum, ValidateFieldCallback } from "@xinxin-ui/typings";

export interface FormContext {
    /**
     * 计算form内所有label的最大宽度
     */
    autoMaxLabelWidth: string;
    
    /**
     * 注册label的宽度
     */
    registerLabelWidth: (newVal: number, oldVal: number) => void;
    
    /**
     * 注销label的宽度
     */
    cancellationLabelWidth: (val: number) => void;
    
    /**
     * 注册label对象
     */
    registerLabel: (labelRef: Ref<HTMLLabelElement>) => void;
    
    /**
     * 注销label对象
     */
    cancellationLabel: (labelRef: Ref<HTMLLabelElement>) => void;
    
    /**
     * 更新所有的label
     */
    updateAllLabelWidth: (width: string) => void;

    /**
     * 设置Form的对齐方式
     */
    labelPosition: String;

    /**
     * 设置Form的尺寸
     */
    size: string;

    /**
     * 设置Form的校验规则
     */
    rules: FormRules;

    /**
     * 表单数据
     */
    model?: Record<string, unknown>;

    /**
     * 将FormItem发送到Form中
     */
    addFormItem: (formItem: FormItemContext) => void;
};

export interface FormItemContext {
    size: string;
    validate?: (trigger: TriggerEnum | null, callback?: ValidateFieldCallback) => void;
    validateStatus?: ValidateStatusEnum;
}

export const FormKey: InjectionKey<FormContext> = Symbol('xForm');
export const FormItemKey: InjectionKey<FormItemContext> = Symbol('xFormItem');
