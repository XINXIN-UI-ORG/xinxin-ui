<script setup lang="ts">
import { generateClassName } from '@xinxin-ui/utils';
import { Left, Right, Arrow, ArrowRight } from '@xinxin-ui/xinxin-icons';
import DateSelector from './DateSelector.vue';
import { useDatePanel } from './date-panel';

const gcn = generateClassName('date-panel');
const { year, month } = useDatePanel();
</script>
<template>
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
      <span :class="gcn.e('display', 'year')">{{ year }}年</span>
      <span :class="gcn.e('display', 'month')">{{ ('00' + month).slice(-2) }}月</span>
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
<style lang="stylus" scoped src="../style/date-panel.styl"></style>