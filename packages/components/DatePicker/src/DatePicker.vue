<script lang="ts" setup>
import { defineProps } from 'vue';
import { generateClassName } from '@xinxin-ui/utils';
import { Calendar } from '@xinxin-ui/xinxin-icons';
import { datePickerProps, useDatePicker } from './date-picker';
import Popover from '../../Popover';
import DatePanel from './DatePanel.vue';

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
        <DatePanel></DatePanel>
      </template>
    </Popover>
  </div>
</template>
<style lang="stylus" scoped src="../style/date-picker.styl"></style>