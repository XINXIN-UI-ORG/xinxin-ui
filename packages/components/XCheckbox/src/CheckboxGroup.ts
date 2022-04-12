import { ExtractPropTypes, PropType, provide, reactive, toRefs, SetupContext } from "vue";
import { checkboxGroupInjectKey } from "@xinxin-ui/symbols";
import { ModelValueType } from "@xinxin-ui/typings";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";

export const checkboxGroupProps = {
    modelValue: {
        type: Array as PropType<ModelValueType[]>,
        default() {
            return [];
        },
    },
};

export const checkboxGroupEmits = {
    [MODEL_VALUE_UPDATE]: null,
};

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
    };
    // 从数组中移除某一项
    let removeFromGroup = (item: ModelValueType) => {
        let modelValueList = props.modelValue;
        modelValueList = modelValueList.filter(val => val !== item);
        emit(MODEL_VALUE_UPDATE, modelValueList);
    };
    // 将group的值注入 以供子组件使用
    provide(checkboxGroupInjectKey, reactive({
        ...toRefs(props),
        addToGroup,
        removeFromGroup,
    }));
    return {

    };
}
