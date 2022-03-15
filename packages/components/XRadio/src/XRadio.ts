import { computed, ExtractPropTypes, inject, onMounted, Ref, SetupContext } from "vue";
import { radioGroupKey } from "@xinxin-ui/symbols";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isString } from "@vue/shared";
import { isBoolean, isNumber } from "@vueuse/core";

export const radioProps = {
    modelValue: {
        type: [Number, String, Boolean],
        default: undefined,
    },
    value: {
        type: [Number, String, Boolean],
        default: undefined,
    },
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    card: {
        type: Boolean,
        default: false,
    }
};

export const radioEmit = {
    [MODEL_VALUE_UPDATE]: (val: string | boolean | number) =>
        isString(val) || isBoolean(val) || isNumber(val),
    blur: null,
    focus: null,
};

export function radioGather(
    props: ExtractPropTypes<typeof radioProps>,
    emit: SetupContext<typeof radioEmit>['emit'],
    radioInputRef: Ref<HTMLInputElement | undefined>
) {
    // 接收从radioGroup传来的参数
    const radioGroupProps = inject(radioGroupKey, undefined);
    const isGroup = computed(() => !!radioGroupProps);
    const inputName = computed(() => {
        // 如果radioGroup有值则使用radioGroup的值
        return isGroup.value ? radioGroupProps!.name : props.name;
    });
    // 是否选中
    const checkValue = computed<boolean>({
        get: () => {
            const finalModelValue = isGroup.value
                ? radioGroupProps!.modelValue
                : props.modelValue;
            return finalModelValue !== undefined
                && props.value !== undefined
                && finalModelValue === props.value;
        },
        set: (value) => {
            let finalModelValue = props.modelValue;
            if (isGroup.value) {
                finalModelValue = radioGroupProps!.modelValue;
                radioGroupProps!.changeEvent(value);
            } else {
                emit(MODEL_VALUE_UPDATE, value);
            }
            radioInputRef.value!.checked = finalModelValue === props.value;
        },
    });
    const blurEvent = (event: Event) => {
        emit("blur", event);
    };
    const focusEvent = (event: Event) => {
        emit("focus", event);
    };
    onMounted(() => {
        // 默认焦点
        if (checkValue.value) {
            radioInputRef.value?.focus();
        }
    });
    return {
        checkValue,
        blurEvent,
        focusEvent,
        inputName,
    };
}
