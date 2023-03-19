import { computed, ExtractPropTypes, provide, reactive, Ref, ref, SetupContext } from 'vue';
import { datePanelInjectKey } from '@xinxin-ui/symbols';
import { useDebounceFn } from '@vueuse/core';
import { SelectorViewEnum } from '@xinxin-ui/typings';
import { MODEL_VALUE_UPDATE } from '@xinxin-ui/constants';

export const datePickerProps = {
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: currentDate(),
  },
};

export const datePickerEnums = {
  [MODEL_VALUE_UPDATE]: null,
};

function currentDate() {
  const now = new Date();
  const month = ('00' + (now.getMonth() + 1)).slice(-2);
  const date = ('00' + now.getDate()).slice(-2);
  return `${now.getFullYear()}-${month}-${date}`;
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;

export function useDatePicker(
  props: DatePickerProps,
  emit: SetupContext<typeof datePickerEnums>['emit'],
  dateDom: Ref<HTMLInputElement>,
) {
  const userSelectDate = computed<string>({
    get() {
      return props.modelValue;
    },
    set(value: string) {
      emit(MODEL_VALUE_UPDATE, value);
    },
  });
  const inputFocus = ref<boolean>(false);
  const currentView = ref<SelectorViewEnum>(SelectorViewEnum.DATE);
  const selectorYear = ref<number>(new Date(userSelectDate.value).getFullYear());
  const selectorMonth = ref<number>(new Date(userSelectDate.value).getMonth() + 1);

  const focusEvent = () => {
    inputFocus.value = true;
  };

  const changeDate = useDebounceFn(() => {
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
    currentView,
    selectorYear,
    selectorMonth,
    inputFocus,
  }));

  return {
    inputFocus,
    focusEvent,
    userSelectDate,
    changeDate,
    backOff,
    currentView,
  };
}


function dateFormatValidate(date: string): boolean {
  return /^[\d]{1,4}-[\d]{2}-[\d]{2}$/.test(date) && !isNaN(Date.parse(date));
}