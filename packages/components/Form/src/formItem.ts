import type { ExtractPropTypes, Ref } from "vue";
import { inject, ref, watch, onMounted, nextTick, provide, reactive, toRefs } from "vue";
import { FormKey, FormItemToComponentKey, FormContext, FormRules, RuleItem } from "@xinxin-ui/symbols";
import { ModelValueType } from "@xinxin-ui/typings";

export const formItemProps = {
    label: {
        type: String,
        default: "",
    },
    ruleName: {
        type: String,
        default: "",
    },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

enum UpdateWidthEnum {
    UPDATE,
    REMOVE,
};

const TRIGGER = {
    CHANGE: 'change',
    BLUR: 'blur'
};

export function useFormItem(
    labelRef: Ref<HTMLLabelElement>,
    props: FormItemProps,
) {
    const xForm = inject(FormKey);
    // 表单规则集合
    const rules = xForm?.rules;
    const errorMsg = ref<string>("");
    
    const computedWidth = ref<number>(0);
    watch(computedWidth, (newVal: number, oldVal: number) => {
        // 当宽度改变时更新form中保存宽度的数组
        xForm?.registerLabelWidth(newVal, oldVal);
        // 更新每个form-item的label
        xForm?.updateAllLabelWidth(xForm.autoMaxLabelWidth);
    });

    const updateLabelWidth = (type = UpdateWidthEnum.UPDATE) => {
        nextTick(() => {
            if (type === UpdateWidthEnum.UPDATE) {
                if (labelRef.value) {
                    const labelRealWidth = parseFloat(window.getComputedStyle(labelRef.value).width);
                    computedWidth.value = labelRealWidth ? labelRealWidth : 0;
                }
            }

            if (type === UpdateWidthEnum.REMOVE) {
                // 移除当前label的宽度
            }
        });
    };

    onMounted(() => {
        updateLabelWidth(UpdateWidthEnum.UPDATE);
        xForm?.registerLabel(labelRef);
    });

    // 判断当前字段是否必选
    const required = isRequired(rules, props.ruleName);
    
    provideToChildrenComponent(xForm, rules, props.ruleName, ({ error }) => {
        errorMsg.value = error;
    });
    
    return {
        required,
        errorMsg,
    };
}

function getInputRule(rules: FormRules | undefined, ruleName: string): RuleItem[] | undefined {
    if (rules) {
        return rules[ruleName];
    }
    return undefined;
}

/**
 * 判断当前输入项是否必选
 * @param rules 规则集合
 * @param ruleName 但钱输入项规则
 * @returns 是否必选
 */
function isRequired(rules: FormRules | undefined, ruleName: string): boolean {
    // 获取当前输入项的规则
    const ruleList = getInputRule(rules, ruleName);
    if (ruleList) {
        // 只要有任意一个规则设置了必选则认为当前输入框必选
        return ruleList.some(rule => !!rule.required);
    }
    return false;
}

function provideToChildrenComponent(
    xForm: FormContext | undefined,
    rules: FormRules | undefined,
    ruleName: string,
    errorFn: ({ error: string }) => void
) {
    if (!xForm) {
        return;
    }

    let validateGather = {};
    let validateMap = new Map<string, any[][]>();
    const ruleList = getInputRule(rules, ruleName);
    if (ruleList) {
        // 获取规则对应的校验方法
        for (let rule of ruleList) {
            let validationList: any[][] = [];
            if (validateMap.has(rule.trigger)) {
                validationList = validateMap.get(rule.trigger)!;
            }

            Object.keys(rule).forEach(key => {
                if (!!buildInValidatorRules[key]) {
                    validationList.push([buildInValidatorRules[key], rule]);
                }
            });
            validateMap.set(rule.trigger, validationList);
        }

        // change的验证全部都要放一份到blur中
        const changeValidations = validateMap.get(TRIGGER.CHANGE);
        if (changeValidations) {
            const blurValidations = validateMap.get(TRIGGER.BLUR) || [];
            validateMap.set(TRIGGER.BLUR, [...blurValidations, ...changeValidations]);
        }

        // 组合校验方法
        validateMap.forEach((validationFuncList, trigger) => {
            validateGather[trigger] = (userInput: ModelValueType, statusSet: (status: string) => void) => {
                for (let [validationFunc, rule] of validationFuncList) {
                    if (validationFunc?.(userInput, rule)) {
                        // 验证失败
                        errorFn({
                            error: rule.message,
                        });
                        // 修改输入框的样式
                        statusSet('error');
                        return;
                    }
                }
                // 验证通过
                errorFn({
                    error: ''
                });
                statusSet('none');
            };
        });
    }

    provide(FormItemToComponentKey, reactive({
        ...toRefs(xForm),
        ...validateGather
    }));
}

/**
 * 表单校验内置规则
 */
const buildInValidatorRules = {
    required(value: ModelValueType) {
        return value === "";
    },
    minLength(value: ModelValueType, rule: RuleItem) {
        return String(value).length < rule.minLength!;
    },
};
