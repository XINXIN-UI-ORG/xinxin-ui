<script setup lang="ts">
import { generateClassName } from '@xinxin-ui/utils';
import { useMonthSelector } from './month-selector';

const gcn = generateClassName('month-selector');
const { monthList, year, switchMonth } = useMonthSelector();
</script>
<template>
  <div :class="gcn.base()">
    <div :class="gcn.e('operation-bar')">
      {{ year }}
    </div>
    <!-- 选择面板 -->
    <div :class="gcn.e('month-selector')">
      <div :class="gcn.e('wrap')" v-for="item in monthList">
        <span :class="[
          gcn.e('wrap', 'text'),
          gcn.middle('wrap', 'text').is('current', item.currentMonth),
          gcn.middle('wrap', 'text').is('select', item.selectMonth),
        ]" @click="switchMonth(item.i)">
          {{ item.label }}
          <span v-if="item.currentMonth" :class="gcn.e('current')"></span>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus" src="../style/month-selector.styl"></style>
