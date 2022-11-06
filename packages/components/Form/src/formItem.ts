import { ExtractPropTypes, reactive, Ref } from "vue";
import { inject, ref, watch, onMounted, nextTick, computed, provide, toRefs } from "vue";
import { FormKey, FormContext, FormItemKey } from "@xinxin-ui/symbols";
import { ModelValueType, TriggerEnum, ValidateFieldCallback, FormRules, RuleItem, ValidateStatusEnum } from "@xinxin-ui/typings";
import { get } from "lodash";
import { NOOP } from "@vue/shared";
import AsyncValidator from "async-validator";


export const formItemProps = {
    label: {
        type: String,
        default: '',
    },
    prop: {
        type: String,
        default: '',
    },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

enum UpdateWidthEnum {
    UPDATE,
    REMOVE,
};

export function useFormItem(
    labelRef: Ref<HTMLLabelElement>,
    props: FormItemProps,
) {
    const xForm = inject(FormKey, {} as FormContext);
    // 表单规则集合
    const rules = xForm.rules;
    const validateMessage = ref<string>('');
    const validateStatus = ref<ValidateStatusEnum>(ValidateStatusEnum.uninitialized);

    const computedWidth = ref<number>(0);
    watch(computedWidth, (newVal: number, oldVal: number) => {
        // 当宽度改变时更新form中保存宽度的数组
        xForm.registerLabelWidth(newVal, oldVal);
        // 更新每个form-item的label
        xForm.updateAllLabelWidth(xForm.autoMaxLabelWidth);
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
        xForm.registerLabel(labelRef);
    });

    // 获取当前表单项的value
    const fieldValue = computed(() => {
        if (!xForm.model || !props.prop) {
            return;
        }

        return get(xForm.model, props.prop);
    });

    // 判断当前字段是否必选
    const required = isRequired(rules, props.prop);
    const validate = (
        trigger: TriggerEnum,
        callback: ValidateFieldCallback = NOOP,
    ) => {
        // 通过trigger获取指定的rule
        const rules = getTriggerRule(trigger);
        if (!rules || rules.length === 0) {
            callback();
            return;
        }

        validateStatus.value = ValidateStatusEnum.validating;
        validateMessage.value = '';
        rules.forEach(rule => Reflect.deleteProperty(rule, 'trigger'));
        // 生成校验器
        const descriptor = {
            [props.prop]: rules,
        };
        const validator = new AsyncValidator(descriptor);
        const model = {
            [props.prop]: fieldValue.value,
        };
        validator.validate(model, { firstFields: true }, (errors, fields) => {
            validateMessage.value = errors ? errors[0].message || '' : '';     
            validateStatus.value = errors ? ValidateStatusEnum.failed : ValidateStatusEnum.success;
            
            callback(validateMessage.value, fields);
        });
    };
    const getTriggerRule = (trigger: TriggerEnum) => {
        const rules: RuleItem[] = get(xForm.rules, props.prop, []);
        if (!trigger) {
            return rules.map(rule => ({ ...rule }));
        }

        return rules.filter(rule => {
            // 如果未设置trigger则任何情况下都进行该条规则校验
            if (!rule.trigger) {
                return true;
            }

            if (Array.isArray(rule.trigger)) {
                return rule.trigger.includes(trigger);
            } else {
                return rule.trigger === trigger;
            }
        }).map(rule => ({ ...rule }));
    };

    const xFormItem = reactive({
        ...toRefs(props),
        ...toRefs(xForm),
        validate,
        validateStatus,
    });

    onMounted(() => {
        if (props.prop) {
            // 将当前的FormItem发送到Form中
            xForm.addFormItem(xFormItem);
        }
    });

    provide(FormItemKey, xFormItem);

    return {
        required,
        validateMessage,
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
 * 
 * @param rules 规则集合
 * @param ruleName 当前输入项规则
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
