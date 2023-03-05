import { inject, ref } from 'vue';
import { datePanelInjectKey } from '@xinxin-ui/symbols';
import { cloneDeep, fill } from 'lodash-es';

const DATE_LIST = ['日', '一', '二', '三', '四', '五', '六'];

type DateItem = {
  i: number;

  /**
   * 是否是当月 0否 1是
   */
  type: number;
};

export const dateSelectorProps = {
};

export function useDateSelector() {
  const dateList = ref<DateItem[][]>([]);

  const { year, month } = inject(datePanelInjectKey)!;
  dateList.value = fillDateList(year.value, month.value);

  // 填充日期

  return {
    DATE_LIST,
    dateList,
  };
}

/**
 * 填充日期列表
 * 
 * @param year 指定年份
 * @param month 指定月份
 */
function fillDateList(year: number, month: number) {
  const dateList: DateItem[][] = [];
  const currentLine: DateItem[] = [];
  let fillCount = 0;
  const startDay = calcStartDay(year, month);
  const prevMonthTailDate = calcTailDate(year, month - 1);
  const currentMonthTailDate = calcTailDate(year, month);

  const pushDate = (i: number, type: number) => {
    fillCount++;
    currentLine.push({ i, type });
    if (currentLine.length === 7) {
      dateList.push(cloneDeep(currentLine));
      currentLine.length = 0;
    }
  };

  // 填充上个月
  for (let i = prevMonthTailDate - startDay + 1; i <= prevMonthTailDate; i++) {
    pushDate(i, 0);
  }

  // 填充当月
  for (let i = 1; i <= currentMonthTailDate; i++) {
    pushDate(i, 1);
  }
  
  // 填充下个月 每周七天 一共6排
  const restDay = 42 - fillCount;
  for (let i = 1; i <= restDay; i++) {
    pushDate(i, 0);
  }

  return dateList;
}

/**
 * 计算指定月份的1号是星期几
 * 
 * @param year 指定年份
 * @param month 指定月份
 */
function calcStartDay(year: number, month: number) {
  const pointDate = new Date(`${year}-${month}-1`);
  return pointDate.getDay();
}


/**
 * 计算指定月份的最后一天
 * 
 * @param year 指定年份 
 * @param month 指定月份
 */
function calcTailDate(year: number, month: number) {
  const pointDate = new Date(year, month, 0);
  return pointDate.getDate();
}