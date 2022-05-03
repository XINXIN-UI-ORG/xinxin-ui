import { NormalSize } from "@xinxin-ui/typings";
import { computed, ref, nextTick } from "vue";
import type { ExtractPropTypes, SetupContext, PropType } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isNumber, isString, RafFnOptions } from "@vueuse/core";

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
    disabled: {
        type: Boolean,
        default: false,
    },
    clearable: {
        type: Boolean,
        default: false,
    },
    filterable: {
        type: Boolean,
        default: false,
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
    let suffixIconShow = ref<number>(0);
    let readonly = ref<boolean>(!props.filterable);
    let inputValue = ref<string>(selectLabels(props)[0]);
    return {
        selectValues: computed<SelectValue[]>(selectValues.bind(null, props)),
        selectLabels: computed<string[]>(selectLabels.bind(null, props)),
        visible,
        readonly,
        inputValue,
        selectToogle() {
            !props.disabled && (visible.value = !visible.value);
            // 如果开启了过滤 当打开菜单时暂时清除内容
            if (props.filterable) {
                if (visible.value) {
                    inputValue.value = '';
                    readonly.value = !props.filterable;
                } else {
                    inputValue.value = selectLabels(props)[0];
                    readonly.value = true;
                }
            }
        },
        optionClick: (value: SelectValue, disabled: boolean | undefined) => {
            // 如果当前项设置了禁用 则不会触发选择
            if (!!disabled) {
                return;
            }
            emit(MODEL_VALUE_UPDATE, value);
            visible.value = false;
            readonly.value = true;
            nextTick(() => {
                inputValue.value = selectLabels(props)[0];
            });
        },
        suffixIconShow,
        showClearBtn() {
            // 如果未开启清除或select框中没有值则不显示
            if (!props.clearable || selectLabels(props).length === 0) {
                return;
            }
            suffixIconShow.value = 1;
        },
        closeClearBtn() {
            suffixIconShow.value = 0;
        },
        clearContent(event: Event) {
            // 阻止select contextmenu展示
            event.stopPropagation();
            let value: SelectValue | SelectValue[] = "";
            emit(MODEL_VALUE_UPDATE, value);
            visible.value = false;
            suffixIconShow.value = 0;
            nextTick(() => {
                inputValue.value = selectLabels(props)[0];
            });
        },
        optionList: computed<OptionItem[]>(()=> {
            let options: OptionItem[] = props.options;
            if (props.filterable) {
                options = props.options.filter(item => item.label.includes(inputValue.value));
            }
            return options;
        }),
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
