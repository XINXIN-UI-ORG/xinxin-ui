import { RadioGroupProps } from "@xinxin-ui/components";
import { InjectionKey } from "vue";

interface RadioGroupInterface extends RadioGroupProps {
    changeEvent: (val: string | number | boolean) => void,
}

export const radioGroupKey: InjectionKey<RadioGroupInterface> = Symbol();
