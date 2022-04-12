import { CheckboxGroupProps } from "@xinxin-ui/components";
import { InjectionKey } from "vue";
import { ModelValueType } from "@xinxin-ui/typings";

interface CheckboxGroupInject extends CheckboxGroupProps {
    addToGroup: (item: ModelValueType) => void;
    removeFromGroup: (item: ModelValueType) => void;
}

export const checkboxGroupInjectKey: InjectionKey<CheckboxGroupInject> = Symbol();

