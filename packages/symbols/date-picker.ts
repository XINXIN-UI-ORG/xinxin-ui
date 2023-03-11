import type { InjectionKey } from 'vue';
import { SelectorViewEnum } from '@xinxin-ui/typings';

interface DatePanelInject {
  userSelectDate: string;

  currentView: SelectorViewEnum;

  selectorYear: number;

  selectorMonth: number;
}

export const datePanelInjectKey: InjectionKey<DatePanelInject> = Symbol('x-date-panel');