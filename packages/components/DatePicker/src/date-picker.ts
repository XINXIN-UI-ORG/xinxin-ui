import { ExtractPropTypes, ref } from 'vue';

export const datePickerProps = {
  placeholder: {
    type: String,
    default: ''
  },
};

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;

export function useDatePicker(
  props: DatePickerProps,
) {
  const inputFocus = ref<boolean>(true);
  const focusEvent = () => {
    inputFocus.value = true;
  };
  const blurEvent = () => {
    // inputFocus.value = false;
  };

  return {
    inputFocus,
    focusEvent,
    blurEvent,
  };
}
