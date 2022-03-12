import { computed, ExtractPropTypes, onMounted, Ref, SetupContext } from "vue";

export const radioProps = {
    modelValue: {
        type: [Number, String, Boolean],
        default: undefined,
    },
    value: {
        type: [Number, String, Boolean],
        default: undefined,
    },
    name: String,
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
    "update:modelValue": null,
    "blur": null,
    "focus": null,
};

export function radioGather(
    props: ExtractPropTypes<typeof radioProps>,
    emit: SetupContext<typeof radioEmit>['emit'],
    radioInputRef: Ref<HTMLInputElement | undefined>
) {
    // 是否选中
    const checkValue = computed<boolean>({
        get: () =>
            props.modelValue !== undefined &&
            props.value !== undefined &&
            props.modelValue === props.value,
        set: (value) => {
            emit("update:modelValue", value);
            radioInputRef.value!.checked = props.modelValue === props.value;
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
    };
}
