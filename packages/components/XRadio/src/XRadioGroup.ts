import { Ref, ExtractPropTypes, provide, toRefs, reactive, SetupContext, nextTick } from "vue";
import { radioGroupKey } from "@xinxin-ui/symbols"
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isString } from "@vue/shared";
import { isBoolean, isNumber } from "@vueuse/core";

export const radioGroupProps = {
    modelValue: {
        type: [String, Number, Boolean],
        default: undefined
    },
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false,
    },
};

export const radioGroupEmits = {
    [MODEL_VALUE_UPDATE]: (val: string | number | boolean) =>
        isString(val) || isNumber(val) || isBoolean(val),
    change: (val: string | number | boolean) =>
        isString(val) || isNumber(val) || isBoolean(val),
};

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;

export const radioGroupGather = (
    props: RadioGroupProps,
    emit: SetupContext<typeof radioGroupEmits>['emit'],
    radioGroupRef: Ref<HTMLTableSectionElement | undefined>
) => {
    // 触发change事件
    const changeEvent = (value: RadioGroupProps['modelValue']) => {
        emit(MODEL_VALUE_UPDATE, value ?? '');
        nextTick(() => emit("change", value ?? ''));
    };
    // 将radioGroup的props传递给radio
    provide(radioGroupKey, reactive({
        ...toRefs(props),
        changeEvent,
    }));
    return {
        changeEvent,
    };
};
