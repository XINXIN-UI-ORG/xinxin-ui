import type { InjectionKey, Ref } from "vue";
import type { ModelValueType } from "@xinxin-ui/typings";

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
};

export const FormKey: InjectionKey<FormContext> = Symbol("xForm");

export interface FormItemToComponent {
    size: string;

    /**
     * 输入框change事件
     */
    change?: (value: ModelValueType, statusSet: (status: string) => void) => void;

    /**
     * 输入框blur事件
     */
    blur?: (value: ModelValueType, statusSet: (status: string) => void) => void;
};

export const FormItemToComponentKey: InjectionKey<FormItemToComponent> = Symbol("xFormItemToComponent");

export interface FormRules {
    [propName: string]: Array<RuleItem>;
};

export interface RuleItem {
    /**
     * 字段是否必须选
     */
    required?: boolean;
    
    /**
     * 错误提示文字
     */
    message: string;

    /**
     * 触发校验方式
     */
    trigger: "blur" | "change"

    /**
     * 最短字符长度限制
     */
    minLength?: number;

    /**
     * 最大字符长度限制
     */
    maxLength?: number;
};