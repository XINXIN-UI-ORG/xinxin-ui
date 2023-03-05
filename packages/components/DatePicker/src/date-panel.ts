import { provide, ref } from "vue";
import { datePanelInjectKey } from '@xinxin-ui/symbols';

export const datePanelProps = {

};

export function useDatePanel() {
  const currentDate = new Date();
  const year = ref<number>(currentDate.getFullYear());
  const month = ref<number>(currentDate.getMonth() + 1);

  provide(datePanelInjectKey, {
    year,
    month,
  });

  return {
    year,
    month,
  };
}