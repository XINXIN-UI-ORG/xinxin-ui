import { NormalSize } from "@xinxin-ui/typings";
import { computed, ref } from "vue";
import { ExtractPropTypes, SetupContext, PropType, nextTick } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isNumber, isString } from "@vueuse/core";

type SelectValue = number | string;

export const selectProps = {
    options: {
        type: Array as PropType<Array<OptionItem>>,
        default: [] as OptionItem[],
    },
    size: {
        type: String as PropType<NormalSize>,
        default: "normal",
    },
    placeholder: {
        type: String,
        default: ""
    },
    block: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String, Number, Array],
        default: ""
    },
};

export const selectEmits = {
    [MODEL_VALUE_UPDATE]: (value: SelectValue) => isString(value) || isNumber(value),
};

export type SelectProps = ExtractPropTypes<typeof selectProps>;

type OptionItem = {
    label: string,
    value: SelectValue,
    disabled: boolean,
};

export function useSelect(
    props: SelectProps,
    emit: SetupContext<typeof selectEmits>['emit'],
) {
    let visible = ref<boolean>(false);
    return {
        selectValues: computed<SelectValue[]>(selectValues.bind(null, props)),
        selectLabels: computed<string[]>(selectLabels.bind(null, props)),
        visible,
        optionClick: (event: Event, value: SelectValue, disabled: boolean | undefined) => {
            // 如果当前项设置了禁用 则不会触发选择
            if (!!disabled) {
                
                return;
            }
            emit(MODEL_VALUE_UPDATE, value);
            visible.value = false;
        },
    };
}

/**
 * 获取用户选中的项
 */
function selectValues(props: SelectProps): SelectValue[] {
    let modelValue = getModelValueList(props);
    return props.options.filter(item => modelValue.indexOf(item.value) !== -1).map(item => item.value);
}

/**
 * 获取用户选中的label
 */
function selectLabels(props: SelectProps): string[] {
    let modelValue = getModelValueList(props);
    return props.options.filter(item => modelValue.indexOf(item.value) !== -1).map(item => item.label);
}

/**
 * 统一modelValue的样式 以数组形式返回
 */
function getModelValueList(props: SelectProps): SelectValue[] {
    let modelValue: Array<SelectValue> = [];
    if (Array.isArray(props.modelValue)) {
        modelValue = props.modelValue as SelectValue[];
    } else {
        modelValue.push(props.modelValue);
    }
    return modelValue;
}
