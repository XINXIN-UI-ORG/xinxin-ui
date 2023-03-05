import type { InjectionKey, Ref } from 'vue';

interface DatePanelInject {
  year: Ref<number>;

  month: Ref<number>;
}

export const datePanelInjectKey: InjectionKey<DatePanelInject> = Symbol('x-date-panel');