import { computed, inject, Ref } from "vue";
import { cloneDeep } from 'lodash-es';
import { datePanelInjectKey } from '@xinxin-ui/symbols';
import { NOOP } from "@vue/shared";
import { SelectorViewEnum } from '@xinxin-ui/typings';
import { DATE_SELECTOR_LENGTH } from '@xinxin-ui/constants';
import { useNow } from "@vueuse/core";

const DATE_LIST = ['一', '二', '三', '四', '五', '六', '日'];

type DateItem = {
  i: number;

  /**
   * 是否是当月 0否 1是
   */
  type: number;

  year: number;

  month: number;

  today: boolean;

  selectDay: boolean;
};

export const datePanelProps = {

};

export function useDatePanel() {
  const datePicker = inject(datePanelInjectKey)!;
  const userSelectDate = computed<Date>({
    get() {
      return new Date(datePicker.userSelectDate);
    },
    set: NOOP,
  });
  const year = computed<number>({
    get() {
      return datePicker.selectorYear;
    },
    set(value) {
      datePicker.selectorYear = value;
      return value;
    },
  });
  const month = computed<number>({
    get() {
      return datePicker.selectorMonth;
    },
    set(value) {
      datePicker.selectorMonth = value;
      return value;
    },
  });
  const dateList = computed<DateItem[][]>(() => {
    return fillDateList(year.value, month.value, userSelectDate);
  });

  const prevMonth = () => {
    const currentDate = new Date(`${year.value}-${month.value}-1`);
    const targetDate = dateDisplacement(currentDate, -1);
    year.value = targetDate.getFullYear();
    month.value = targetDate.getMonth() + 1;
  };

  const nextMonth = () => {
    const currentDate = new Date(`${year.value}-${month.value}-1`);
    const targetDate = dateDisplacement(currentDate, 1);
    year.value = targetDate.getFullYear();
    month.value = targetDate.getMonth() + 1;
  };

  const prevYear = () => {
    year.value = year.value - 1;
  };

  const nextYear = () => {
    year.value = year.value + 1;
  };

  const selectDate = (newYear: number, newMonth: number, date: number) => {
    year.value = newYear;
    month.value = newMonth;
    const formatMonth = ('00' + newMonth).slice(-2);
    const formatDate = ('00' + date).slice(-2);
    datePicker.userSelectDate = `${newYear}-${formatMonth}-${formatDate}`;
    userSelectDate.value = new Date(datePicker.userSelectDate);
    datePicker.inputFocus = false;
  };

  const selectCurrentDate = () => {
    const now = new Date();
    selectDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
  };

  const changeYearSelector = () => {
    datePicker.currentView = SelectorViewEnum.YEAR;
    datePicker.selectorYear = year.value;
  };

  const changeMonthSelector = () => {
    datePicker.currentView = SelectorViewEnum.MONTH;
    datePicker.selectorMonth = month.value;
  };

  return {
    year,
    month,
    DATE_LIST,
    dateList,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    selectDate,
    selectCurrentDate,
    changeYearSelector,
    changeMonthSelector,
  };
}

/**
 * 填充日期列表
 * 
 * @param year 指定年份
 * @param month 指定月份
 */
function fillDateList(year: number, month: number, userSelectDate: Ref<Date>) {
  let fillCount = 0;
  const dateList: DateItem[][] = [];
  const currentLine: DateItem[] = [];
  const mainDate = new Date(`${year}-${month}-1`);
  const prevDate = dateDisplacement(mainDate, -1);
  const nextDate = dateDisplacement(mainDate, 1);
  const startDay = calcStartDay(year, month);
  const prevMonthTailDate = calcTailDate(year, month - 1);
  const currentMonthTailDate = calcTailDate(year, month);

  const pushDate = (i: number, type: number, date: Date) => {
    date.setDate(i);
    fillCount++;
    currentLine.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      i,
      type,
      today: isSameDay(useNow().value, date),
      selectDay: isSameDay(userSelectDate.value, date),
    });

    if (currentLine.length === 7) {
      dateList.push(cloneDeep(currentLine));
      currentLine.length = 0;
    }
  };

  // 填充上个月
  for (let i = prevMonthTailDate - startDay + 2; i <= prevMonthTailDate; i++) {
    pushDate(i, 0, prevDate);
  }

  // 填充当月
  for (let i = 1; i <= currentMonthTailDate; i++) {
    pushDate(i, 1, mainDate);
  }
  
  // 填充下个月 每周七天 一共6排
  const restDay = DATE_SELECTOR_LENGTH - fillCount;
  for (let i = 1; i <= restDay; i++) {
    pushDate(i, 0, nextDate);
  }

  return dateList;
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate()
  );
}

function dateDisplacement(date: Date, displacement: number) {
  const displamentDate = new Date(date);
  displamentDate.setMonth(displamentDate.getMonth() + displacement);
  return displamentDate;
}

/**
 * 计算指定月份的1号是星期几
 * 
 * @param year 指定年份
 * @param month 指定月份
 */
function calcStartDay(year: number, month: number) {
  const pointDate = new Date(`${year}-${month}-1`);
  return pointDate.getDay() === 0 ? 7 : pointDate.getDay();
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
