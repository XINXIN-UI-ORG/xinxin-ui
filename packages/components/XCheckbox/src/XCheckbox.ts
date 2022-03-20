import { computed, ExtractPropTypes } from "vue";

export const checkboxProps = {
    modelValue: {
        type: [Number, Boolean, String],
        default: undefined,
    },
    value: {
        type: [Number, Boolean, String],
        default: undefined,
    },
    label: {
        type: String,
        default: "xinxin-ui"
    },
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

export function checkboxGather() {
    let modelValue = computed({
        get() {
            
        },
        set(value) {

        }
    });
    return {

    };
}
