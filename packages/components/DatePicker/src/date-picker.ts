import { ExtractPropTypes, provide, reactive, Ref, ref } from 'vue';
import { datePanelInjectKey } from '@xinxin-ui/symbols';
import { debounce } from 'lodash-es';

export const datePickerProps = {
  placeholder: {
    type: String,
    default: ''
  },
};

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;

export function useDatePicker(
  props: DatePickerProps,
  dateDom: Ref<HTMLInputElement>,
) {
  const userSelectDate = ref<string>('2023-03-07');
  const inputFocus = ref<boolean>(true);
  const focusEvent = () => {
    inputFocus.value = true;
  };

  const blurEvent = () => {
    // inputFocus.value = false;
  };

  const changeDate = debounce(() => {
    const inputDate = dateDom.value.value;
    // 验证
    if (!dateFormatValidate(inputDate)) {
      return;
    }

    userSelectDate.value = inputDate;
  }, 500);

  const backOff = () => {
    dateDom.value.value = userSelectDate.value;
  };

  provide(datePanelInjectKey, reactive({
    userSelectDate,
  }));

  return {
    inputFocus,
    focusEvent,
    blurEvent,
    userSelectDate,
    changeDate,
    backOff,
  };
}


function dateFormatValidate(date: string): boolean {
  return /^[\d]{1,4}-[\d]{2}-[\d]{2}$/.test(date) && !isNaN(Date.parse(date));
}