import type { ValidateFieldsError } from "async-validator";

export interface ValidateFieldCallback {
    (errorMessage?: string, invalidFields?: ValidateFieldsError): void;
};

export interface ValidateCallback {
    (isValid: boolean, invalidFields?: ValidateFieldsError): void;
};

export enum TriggerEnum {
    change = 'change',
    blur = 'blur',
}

export enum ValidateStatusEnum {
    uninitialized,
    validating,
    failed,
    success,
}

/**
 * 表单校验规则类型
 */
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
    message?: string;

    /**
     * 触发校验方式
     */
    trigger: TriggerEnum | TriggerEnum[];

    /**
     * 最短字符长度限制
     */
    min?: number;

    /**
     * 最大字符长度限制
     */
    max?: number;

    /**
     * 自定义校验正则
     */
    pattern?: RegExp;

    /**
     * 自定义验证器
     */
    validator?: (rule: any, value: any, callback: any) => void;
};