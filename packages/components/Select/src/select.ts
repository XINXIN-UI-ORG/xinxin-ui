import { NormalSize } from "@xinxin-ui/typings";
import { computed, ref, nextTick, onBeforeUnmount, watchEffect, reactive } from "vue";
import type { ExtractPropTypes, SetupContext, PropType, Ref } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isNumber, isString } from "@vueuse/core";
import { Log } from "@xinxin-ui/utils";
import type Popover from "../../Popover";
import { ScrollPosition } from "../../Scrollbar/src/scrollbar";
import { VirtualList, ContainerState } from "@xinxin-ui/utils";

export type SelectValue = number | string;

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
    collapseTags: {
        type: Boolean,
        default: false,
    },
    collapseTagsTooltip: {
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
    focus: (value: SelectValue | SelectValue[]) => {
        return isString(value) ||
            isNumber(value) ||
            value.every(item => isString(item) || isNumber(item));
    },
    blur: (value: SelectValue | SelectValue[]) => {
        return isString(value) ||
            isNumber(value) ||
            value.every(item => isString(item) || isNumber(item));
    },
};

export type SelectProps = ExtractPropTypes<typeof selectProps>;

export type OptionItem = {
    index?: number;
    label: string,
    value: SelectValue,
    disabled?: boolean,
    type?: SelectTypeEnum,
    children?: OptionItem[],
};

export enum SelectTypeEnum {
    GROUP,
    ITEM,
};

type OptionClickObj = {
    e: Event,
    value: SelectValue,
    disabled: boolean,
};

export function useSelect(
    props: SelectProps,
    emit: SetupContext<typeof selectEmits>['emit'],
    popoverRef: Ref<InstanceType<typeof Popover> | undefined>,
    collapseTagPopoverRef: Ref<InstanceType<typeof Popover> | undefined>,
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
    // 选中或反选select
    const optionClick = (e: Event, value: SelectValue, disabled: boolean) => {
        e.stopPropagation();
        // 如果当前项设置了禁用 则不会触发选择
        if (disabled) {
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
            // 重新计算selectmenu的位置
            popoverRef.value?.update();
            collapseTagPopoverRef.value?.update();
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
    };
    // 渲染数据
    const virtualList = new VirtualList<OptionItem>(260);
    const containerState = reactive<ContainerState>({
        height: 0,
        translate: 0,
    });
    let optionList = ref<OptionItem[]>([]);
    watchEffect(()=> {
        let options: OptionItem[];
        if (props.filterable) {
            options = filterOptionList(inputValue.value, props.options);
        } else {
            options = props.options;
        }
        options = getFlatOptionList(options);
        // 虚拟化列表
        virtualList.setDataList(options);
        options = virtualList.updateDataList(0, containerState);
        optionList.value = options;
    });
    return {
        selectValues: computed<SelectValue[]>(selectValues.bind(null, props)),
        selectLabels: computed<string[]>(selectLabels.bind(null, props)),
        selectOptions: computed<OptionItem[]>(selectOptions.bind(null, props)),
        visible,
        readonly,
        inputValue,
        selectToogle() {
            if (props.disabled) {
                return;
            }
            visible.value = !visible.value;
            if (visible.value) {
                optionList.value = virtualList.updateDataList(0, containerState);
            }
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
        optionClick,
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
            let value: SelectValue | SelectValue[] = props.multiple ? [] : "";
            emit(MODEL_VALUE_UPDATE, value);
            !props.multiple && (visible.value = false);
            suffixIconShow.value = 0;
            nextTick(() => {
                inputValue.value = getInputValue(props);
            });
        },
        optionList,
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
        changeSelect(changeObj: OptionClickObj) {
            optionClick(changeObj.e, changeObj.value, changeObj.disabled);
        },
        selectMenuScroll(scrollPosition: ScrollPosition) {
            // 监听虚拟列表
            optionList.value = virtualList.updateDataList(scrollPosition.scrollTop, containerState);
        },
        containerStyle: computed(() => {
            if (!virtualList.isVirtualList()) {
                return;
            }
            return {
                "height": `${containerState.height}px`,
            };
        }),
        menuStyle: computed(() => {
            if (!virtualList.isVirtualList()) {
                return;
            }
            return {
                "transform": `translateY(${containerState.translate}px)`,
            };
        }),
        updateCache(data: { index: number, height: number }) {
            virtualList.updateCache(data.index, data.height);
        }
    };
}

function filterOptionList(filterValue: string, optionList: OptionItem[]): OptionItem[] {
    const copyOptionList = JSON.parse(JSON.stringify(optionList)) as OptionItem[];
    return copyOptionList.filter(option => {
        if (option.type === SelectTypeEnum.GROUP) {
            // 如果是选项组 则针对选项组内的children数据进行筛选
            if (option.children) {
                option.children = option.children.filter(child => child.label.includes(filterValue));
            }
            // 如果筛选之后组中有值则保留该组 否则去除该组
            return option.children && option.children.length > 0;
        }
        // 如果是单项，则过滤单项
        return option.label.includes(filterValue);
    });
}

function getInputValue(props: SelectProps): string {
    if (props.multiple) {
        // 如果是多选 则不应该有任何的值出现在input框中
        return '';
    }
    return selectLabels(props)[0];
}

/**
 * 获取用户选中的数据
 */
function selectOptions(props: SelectProps): OptionItem[] {
    let modelValue = getModelValueList(props);
    return getFlatOptionList(props.options)
            .filter(item => item.type !== SelectTypeEnum.GROUP && modelValue.indexOf(item.value) !== -1);
}

/**
 * 获取用户选中的项
 */
function selectValues(props: SelectProps): SelectValue[] {
    let modelValue = getModelValueList(props);
    return getFlatOptionList(props.options)
            .filter(item => item.type !== SelectTypeEnum.GROUP && modelValue.indexOf(item.value) !== -1)
            .map(item => item.value);
}

/**
 * 获取用户选中的label
 */
function selectLabels(props: SelectProps): string[] {
    let modelValue = getModelValueList(props);
    return getFlatOptionList(props.options)
            .filter(item => item.type !== SelectTypeEnum.GROUP && modelValue.indexOf(item.value) !== -1)
            .map(item => item.label);
}

// 获取展平后的select选项集合 可能存在选项组的情况 需要展平
function getFlatOptionList(optionList: OptionItem[]): OptionItem[] {
    return optionList.flatMap(item => {
        let result: OptionItem[] = [item];
        if (item.type === SelectTypeEnum.GROUP && item.children) {
            // 如果是group类型，将内容展平
            result = [...result, ...item.children];
        }
        return result;
    });
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
