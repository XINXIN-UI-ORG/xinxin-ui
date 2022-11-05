import { computed, ExtractPropTypes, SetupContext, inject, PropType } from "vue";
import { isBoolean } from "@vueuse/core";
import { checkboxGroupInjectKey } from "@xinxin-ui/symbols";
import { ModelValueTypeVue, NormalSize } from "@xinxin-ui/typings";
import { groupCombineItemStatus } from "@xinxin-ui/constants";
import { FormItemKey } from "@xinxin-ui/symbols";

export const checkboxProps = {
    checked: {
        type: Boolean,
        default: false,
    },
    value: {
        type: ModelValueTypeVue,
        default: '',
    },
    label: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    indeterminate: {
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

export const checkboxEmits = {
    "update:checked": (val: boolean) => {
        return isBoolean(val);
    },
};

export type CheckboxEmits = typeof checkboxEmits;

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

export function checkboxGather(
    props: CheckboxProps,
    emit: SetupContext<CheckboxEmits>['emit'],
) {
    // 接收group传过来的参数
    const checkboxGroupProps = inject(checkboxGroupInjectKey, undefined);
    // 判断外层是否包裹了checkboxGroup
    const isGroup = computed<boolean>(() => !!checkboxGroupProps);
    let checked = computed<boolean>({
        get() {
            if (isGroup.value) {
                let isCheck = checkboxGroupProps?.modelValue.indexOf(props.value) !== -1;
                // 当选项组中初始值包含该checkbox的value时，需要将checked设置为选中
                emit("update:checked", isCheck);
                return isCheck;
            }
            return props.checked;
        },
        set(checked: boolean) {
            emit("update:checked", checked);
            if (isGroup.value) {
                // 判断是否是选中状态
                if (checked === true) {
                    // 将当前的value添加到group的modelValue中
                    checkboxGroupProps?.addToGroup(props.value);
                } else {
                    // 将当前value从group的modelValue中移除以保证当前选项框未选中
                    checkboxGroupProps?.removeFromGroup(props.value);
                }
            }
        }
    });
    
    const formItem = inject(FormItemKey, {
        size: isGroup.value ? checkboxGroupProps!.size : props.size,
    });

    return {
        checked,
        name: groupCombineItemStatus<string>(isGroup.value, props.name, checkboxGroupProps ? checkboxGroupProps.name : ''),
        disabled: groupCombineItemStatus<boolean>(isGroup.value, props.disabled, checkboxGroupProps ? checkboxGroupProps.disabled : false),
        formItem,
    };
}
