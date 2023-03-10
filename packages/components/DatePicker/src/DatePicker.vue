<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { Ref } from 'vue';
import { generateClassName } from '@xinxin-ui/utils';
import { Calendar } from '@xinxin-ui/xinxin-icons';
import { datePickerProps, useDatePicker } from './date-picker';
import Popover from '../../Popover';
import DatePanel from './DateSelector.vue';

const gcn = generateClassName('date-picker');

const props = defineProps(datePickerProps);
const dateDom = ref<HTMLInputElement>() as Ref<HTMLInputElement>;
const {
  focusEvent,
  blurEvent,
  inputFocus,
  userSelectDate,
  changeDate,
  backOff,
} = useDatePicker(props, dateDom);
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
          @blur="blurEvent"
          :value="userSelectDate"
          @input="changeDate"
          @change="backOff"
          ref="dateDom"
        >
        <Calendar :class="gcn.e('content', 'icon')" />
      </div>
      <!-- 面板框 -->
      <template #content>
        <DatePanel></DatePanel>
      </template>
    </Popover>
  </div>
</template>
<style lang="stylus" scoped src="../style/date-picker.styl"></style>