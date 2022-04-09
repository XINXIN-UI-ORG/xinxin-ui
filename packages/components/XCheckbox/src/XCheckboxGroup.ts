import { ExtractPropTypes, PropType } from "vue";

type ModelValueType = String | Number | Boolean;

export const checkboxGroupProps = {
    modelValue: {
        type: Array as PropType<ModelValueType[]>,
        default() {
            return [];
        },
    },
};

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;

