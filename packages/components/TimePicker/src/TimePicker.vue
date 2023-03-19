<script setup lang="ts">
import Popover from '../../Popover';
import XInput from '../../XInput';
import { Time } from '@xinxin-ui/xinxin-icons';
import { timePickerProps } from './time-picker';
import { generateClassName } from '@xinxin-ui/utils';
import TimeSelector from './TimeSelector.vue';

const props = defineProps(timePickerProps);
const gcn = generateClassName('time-picker');
</script>
<template>
  <div :class="gcn.base()">
    <popover
      :show="true"
      placement="bottom-start"
      :show-arrow="false"
      :_extend-width="2"
      style="padding: 0;"
    >
      <x-input
        :placeholder="props.placeholder"
      >
        <template #suffix>
          <Time :class="gcn.e('icon')" />
        </template>
      </x-input>
      <template #content>
        <time-selector></time-selector>
        <div>此刻</div>
      </template>
    </popover>
  </div>
</template>
<style scoped lang="stylus" src="../style/time-picker.styl"></style>