import { computed, ExtractPropTypes, SetupContext } from "vue";
import { isBoolean } from "@vueuse/core";

export const checkboxProps = {
    checked: {
        type: Boolean,
        default: false,
    },
    value: {
        type: [Number, Boolean, String],
        default: undefined,
    },
    label: {
        type: String,
        default: "xinxin-ui"
    },
    name: {
        type: String,
        default: ""
    },
    disabled: {
        type: Boolean,
        default: false,
    },
};

export const checkboxEmits = {
    "update:checked": (val: Boolean) => {
        return isBoolean(val);
    },
};

export type CheckboxEmits = typeof checkboxEmits;

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

export function checkboxGather(
    props: CheckboxProps,
    emit: SetupContext<CheckboxEmits>['emit'],
) {
    let checked = computed<boolean>({
        get() {
            return props.checked;
        },
        set(checked: boolean) {
            emit("update:checked", checked);
        }
    });
    return {
        checked,
    };
}
