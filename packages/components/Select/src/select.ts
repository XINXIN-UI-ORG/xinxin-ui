import { NormalSize } from "@xinxin-ui/typings";
import { PropType, ExtractPropTypes, computed, ref, SetupContext } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isNumber, isString } from "@vueuse/core";

type SelectValue = number | string;

export const selectProps = {
    options: {
        type: Array as PropType<Array<OptionItem>>,
        default: [],
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
        type: Object as PropType<SelectValue | SelectValue[]>,
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
        showSelectIcon: computed<boolean>(() => {
            let modelValue: Array<SelectValue> = [];
            if (Array.isArray(props.modelValue)) {
                modelValue = props.modelValue;
            } else {
                modelValue.push(props.modelValue);
            }
            return props.options.some(item => modelValue.indexOf(item.value) !== -1);
        }),
        visible,
        optionClick: (value: SelectValue) => {
            emit(MODEL_VALUE_UPDATE, value);
            visible.value = false;
        },
    };
}
