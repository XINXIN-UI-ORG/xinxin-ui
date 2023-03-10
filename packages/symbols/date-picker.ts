import type { InjectionKey, Ref } from 'vue';

interface DatePanelInject {
  userSelectDate: string;
}

export const datePanelInjectKey: InjectionKey<DatePanelInject> = Symbol('x-date-panel');