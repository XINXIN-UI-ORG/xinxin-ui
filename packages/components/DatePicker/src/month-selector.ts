import { computed, inject } from "vue";
import { datePanelInjectKey } from '@xinxin-ui/symbols';
import { MONTH_MAP } from '@xinxin-ui/constants';
import { SelectorViewEnum } from "@xinxin-ui/typings";

interface MonthItem {
  i: number;

  label: string;

  currentMonth: boolean;

  selectMonth: boolean;
};

export function useMonthSelector() {
  const datePicker = inject(datePanelInjectKey)!;
  const monthList = computed<MonthItem[]>(() => {
    const dataList: MonthItem[] = [];  
    for (let i = 0; i < 12; i++) {
      const label = MONTH_MAP[i];
      dataList.push({
        i,
        label,
        currentMonth: i === new Date().getMonth(),
        selectMonth: i === datePicker.selectorMonth - 1,
      });
    }

    return dataList;
  });

  const switchMonth = (month: number) => {
    datePicker.selectorMonth = month + 1;
    datePicker.currentView = SelectorViewEnum.DATE;
  };

  return {
    monthList,
    year: datePicker.selectorYear,
    switchMonth,
  };
}
