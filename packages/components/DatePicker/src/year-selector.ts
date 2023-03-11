import { datePanelInjectKey } from '@xinxin-ui/symbols';
import { computed, inject, ref } from 'vue';
import { YEAR_SELECTOR_LENGTH } from '@xinxin-ui/constants';
import { SelectorViewEnum } from '@xinxin-ui/typings';

interface YearItem {
  i: number;

  currentYear: boolean;

  selectYear: boolean;
};

export function useYearSelector() {
  const datePicker = inject(datePanelInjectKey)!;
  const startYear = ref<number>(Math.floor(datePicker.selectorYear / 10) * 10);
  const yearList = computed<YearItem[]>(() => {
    const dataList: YearItem[] = [];
    for (let i = startYear.value; i < startYear.value + YEAR_SELECTOR_LENGTH; i++) {
      dataList.push({
        i,
        currentYear: i === new Date().getFullYear(),
        selectYear: i === datePicker.selectorYear,
      });
    }

    return dataList;
  });

  const prevYearSwitch = () => {
    startYear.value = startYear.value - YEAR_SELECTOR_LENGTH;
  };

  const nextYearSwitch = () => {
    startYear.value = startYear.value + YEAR_SELECTOR_LENGTH;
  };

  const switchYear = (year: number) => {
    datePicker.selectorYear = year;
    datePicker.currentView = SelectorViewEnum.DATE;
  };

  return {
    yearList,
    prevYearSwitch,
    nextYearSwitch,
    switchYear,
  };
}
