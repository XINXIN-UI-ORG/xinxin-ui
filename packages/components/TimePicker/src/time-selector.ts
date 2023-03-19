import { Ref, ref } from "vue";

export function useTimeSelector() {
  const hourList = ref<number[]>([]);
  const minList = ref<number[]>([]);
  const secondList = ref<number[]>([]);

  initList(hourList, minList, secondList);
}

function initList(hourList: Ref<number[]>, minList: Ref<number[]>, secondList: Ref<number[]>) {
  
}