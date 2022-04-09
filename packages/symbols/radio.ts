import { RadioGroupProps, RadioProps } from "@xinxin-ui/components";
import { InjectionKey } from "vue";

interface RadioGroupInterface extends RadioGroupProps {
    changeEvent: (val: RadioProps['modelValue']) => void,
}

export const radioGroupKey: InjectionKey<RadioGroupInterface> = Symbol();
