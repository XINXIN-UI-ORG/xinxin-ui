<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { generateClassName } from '@xinxin-ui/utils';
import { Calendar } from '@xinxin-ui/xinxin-icons';
import { datePickerProps, useDatePicker, datePickerEnums } from './date-picker';
import Popover from '../../Popover';
import DateSelector from './DateSelector.vue';
import YearSelector from './YearSelector.vue';
import MonthSelector from './MonthSelector.vue';
import { SelectorViewEnum } from '@xinxin-ui/typings';

const gcn = generateClassName('date-picker');

const props = defineProps(datePickerProps);
const emits = defineEmits(datePickerEnums);
const dateDom = ref<HTMLInputElement>() as Ref<HTMLInputElement>;
const {
  focusEvent,
  inputFocus,
  userSelectDate,
  changeDate,
  backOff,
  currentView,
} = useDatePicker(props, emits, dateDom);
</script>
<template>
  <div :class="[
    gcn.base()
  ]">
    <Popover
      :show="inputFocus"
      placement="bottom-start"
      :show-arrow="false"
      :_extend-width="2"
      style="padding: 0;"
    >
      <div :class="[
        gcn.e('content'),
        gcn.is('focus', inputFocus),
      ]">
        <input
          type="text"
          :class="gcn.e('content', 'input')"
          :placeholder="props.placeholder"
          @focus="focusEvent"
          :value="userSelectDate"
          @input="changeDate"
          @change="backOff"
          ref="dateDom"
        >
        <Calendar :class="gcn.e('content', 'icon')" />
      </div>
      <!-- 面板框 -->
      <template #content>
        <date-selector v-if="currentView === SelectorViewEnum.DATE"></date-selector>
        <year-selector v-if="currentView === SelectorViewEnum.YEAR"></year-selector>
        <month-selector v-if="currentView === SelectorViewEnum.MONTH"></month-selector>
      </template>
    </Popover>
  </div>
</template>
<style lang="stylus" scoped src="../style/date-picker.styl"></style>