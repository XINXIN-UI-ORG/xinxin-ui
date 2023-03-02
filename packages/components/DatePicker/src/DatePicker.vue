<script lang="ts" setup>
import { defineProps } from 'vue';
import { generateClassName } from '@xinxin-ui/utils';
import { Calendar, Left, Right, Arrow, ArrowRight } from '@xinxin-ui/xinxin-icons';
import { datePickerProps, useDatePicker } from './date-picker';
import Popover from '../../Popover';
import DateSelector from './DateSelector.vue';

const gcn = generateClassName('date-picker');

const props = defineProps(datePickerProps);
const { focusEvent, blurEvent, inputFocus } = useDatePicker(props);
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
        >
        <Calendar :class="gcn.e('content', 'icon')" />
      </div>
      <!-- 面板框 -->
      <template #content>
        <!-- 操作栏 -->
        <div :class="gcn.e('operation-bar')">
          <div
            :class="[
              gcn.e('operation-icon'),
            ]"
          >
            <Arrow />
          </div>
          <div
            :class="[
              gcn.e('operation-icon'),
            ]"
          >
            <Left />
          </div>
          <div :class="gcn.e('display')">
            <span :class="gcn.e('display', 'year')">2007年</span>
            <span :class="gcn.e('display', 'month')">06月</span>
          </div>
          <div
            :class="[
              gcn.e('operation-icon'),
            ]"
          >
            <Right />
          </div>
          <div
            :class="[
              gcn.e('operation-icon'),
            ]"
          >
            <ArrowRight />
          </div>
        </div>
        <!-- 选择栏 -->
        <div :class="gcn.e('selector')">
          <DateSelector></DateSelector>
        </div>
      </template>
    </Popover>
  </div>
</template>
<style lang="stylus" scoped src="../style/date-picker.styl"></style>