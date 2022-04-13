import { ExtractPropTypes, PropType, provide, reactive, toRefs, SetupContext } from "vue";
import { checkboxGroupInjectKey } from "@xinxin-ui/symbols";
import { ModelValueType, NormalSize } from "@xinxin-ui/typings";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isBoolean, isNumber, isString } from "@vueuse/core";

export const checkboxGroupProps = {
    modelValue: {
        type: Array as PropType<ModelValueType[]>,
        default() {
            return [];
        },
    },
    name: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String as PropType<NormalSize>,
        default: "normal"
    },
};

export const checkboxGroupEmits = {
    [MODEL_VALUE_UPDATE]: null,
    change: (value: ModelValueType[]) => {
        return value.every(item => isNumber(item) || isBoolean(item) || isString(item));
    },
};

export type CheckboxGroupEmits = typeof checkboxGroupEmits;

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;

export function useCheckboxGroup(
    props: CheckboxGroupProps,
    emit: SetupContext<typeof checkboxGroupEmits>['emit']
) {
    // 添加某一项到数组中
    let addToGroup = (item: ModelValueType) => {
        let modelValueList = props.modelValue;
        modelValueList.push(item);
        emit(MODEL_VALUE_UPDATE, modelValueList);
        emit("change", modelValueList);
    };
    // 从数组中移除某一项
    let removeFromGroup = (item: ModelValueType) => {
        let modelValueList = props.modelValue;
        modelValueList = modelValueList.filter(val => val !== item);
        emit(MODEL_VALUE_UPDATE, modelValueList);
        emit("change", modelValueList);
    };
    // 将group的值注入 以供子组件使用
    provide(checkboxGroupInjectKey, reactive({
        ...toRefs(props),
        addToGroup,
        removeFromGroup,
    }));
}
