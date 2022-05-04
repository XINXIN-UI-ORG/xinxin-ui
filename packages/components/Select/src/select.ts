import { NormalSize } from "@xinxin-ui/typings";
import { computed, ref, nextTick, onBeforeUnmount } from "vue";
import type { ExtractPropTypes, SetupContext, PropType } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isNumber, isString } from "@vueuse/core";
import { Log } from "@xinxin-ui/utils";

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
    multiple: {
        type: Boolean,
        default: false,
    },
};

export const selectEmits = {
    [MODEL_VALUE_UPDATE]: (value: SelectValue | SelectValue[]) => {
        return isString(value) ||
            isNumber(value) ||
            value.every(item => isString(item) || isNumber(item));
    },
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
    // 点击其他地方关闭popover
    let closeSelectMenu = (): void => {
        visible.value = false;
        inputValue.value = getInputValue(props);
    };
    document.addEventListener("click", closeSelectMenu);
    onBeforeUnmount(() => {
        document.removeEventListener("click", closeSelectMenu);
    });

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
                    inputValue.value = getInputValue(props);
                    readonly.value = true;
                }
            }
        },
        optionClick: (value: SelectValue, disabled: boolean | undefined) => {
            // 如果当前项设置了禁用 则不会触发选择
            if (!!disabled) {
                return;
            }
            let newValue: SelectValue[] | SelectValue = props.multiple ? [] : value;
            if (props.multiple) {
                // 如果开启了多选，则将选中的数据插入到modelValue中
                if (!Array.isArray(props.modelValue)) {
                    Log.standardLogout("绑定的变量不是数组，无法开启多选模式。");
                    return;
                }
                newValue = props.modelValue as SelectValue[];
                let index = newValue.indexOf(value);
                if (index !== -1) {
                    // 如果当前选项已经选中 则去除
                    newValue.splice(index, 1);
                } else {
                    // 否则添加
                    newValue.push(value);
                }
            } else {
                if (Array.isArray(props.modelValue)) {
                    Log.standardLogout("绑定的变量是数组, 是否启用multiple开启多选模式?");
                    return;
                }
                // 如果未开启多选 则直接关闭selectmenu、将输入框只读并将选中数据展示到输入框中
                visible.value = false;
                readonly.value = true;
                nextTick(() => {
                    inputValue.value = getInputValue(props);
                });
            }
            // 更新modelValue
            emit(MODEL_VALUE_UPDATE, newValue);
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
                inputValue.value = getInputValue(props);
            });
        },
        optionList: computed<OptionItem[]>(()=> {
            let options: OptionItem[] = props.options;
            if (props.filterable) {
                options = props.options.filter(item => item.label.includes(inputValue.value));
            }
            return options;
        }),
        multipleFilterFlag: computed<boolean>(() => {
            // 当select模式为multiple且开启了可搜索并且已经选了最少一个值
            // 该条件针对部分需要选值后才开启的特效
            return props.multiple && !props.filterable && selectLabels(props).length > 0;
        }),
        multipleFlag: computed<boolean>(() => {
            // 当select模式为multiple且至少选中了一个值
            return props.multiple && selectLabels(props).length > 0;
        }),
        placeholder: computed<string>(() => {
            let placeholder = selectLabels(props)[0] || props.placeholder;
            if (props.multiple) {
                // 如果是多选，则当用户未选取值时为默认的placeholder 否则没有提示
                if (selectLabels(props).length > 0) {
                    placeholder= '';
                } else {
                    placeholder = props.placeholder;
                }
            }
            return placeholder;
        }),
    };
}

function getInputValue(props: SelectProps): string {
    if (props.multiple) {
        // 如果是多选 则不应该有任何的值出现在input框中
        return '';
    }
    return selectLabels(props)[0];
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
