import { computed, ExtractPropTypes, inject, onMounted, PropType, Ref, SetupContext } from "vue";
import { radioGroupKey } from "@xinxin-ui/symbols";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isString } from "@vue/shared";
import { isBoolean, isNumber } from "@vueuse/core";
import { NormalSize } from "@xinxin-ui/typings";
import { FormItemKey } from "@xinxin-ui/symbols";

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
    },
    size: {
        type: String as PropType<NormalSize>,
        default: "normal"
    },
};

export const radioEmit = {
    [MODEL_VALUE_UPDATE]: (val: RadioProps['modelValue']) =>
        isString(val) || isBoolean(val) || isNumber(val),
    blur: null,
    focus: null,
};

export type RadioProps = ExtractPropTypes<typeof radioProps>; 

export function radioGather(
    props: RadioProps,
    emit: SetupContext<typeof radioEmit>['emit'],
    radioInputRef: Ref<HTMLInputElement | undefined>
) {
    // 接收从radioGroup传来的参数
    const radioGroupProps = inject(radioGroupKey, undefined);
    const isGroup = computed(() => !!radioGroupProps);
    const inputName = computed(() =>
        // 如果radioGroup有值则使用radioGroup的值
        isGroup.value ? radioGroupProps!.name : props.name
    );
    // 是否禁用
    const disabled = computed(() =>
        isGroup.value ? radioGroupProps!.disabled : props.disabled
    );
    // radio大小
    const size = computed(() =>
        isGroup.value ? radioGroupProps!.size : props.size
    );
    // 是否选中
    const checkValue = computed<RadioProps['modelValue']>({
        get: () => {
            return isGroup.value
                ? radioGroupProps!.modelValue
                : props.modelValue;
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

    const formItem = inject(FormItemKey, {
        size: size.value
    });

    return {
        checkValue,
        blurEvent,
        focusEvent,
        inputName,
        disabled,
        formItem,
    };
}
