<script setup lang="ts">
import { generateClassName } from '@xinxin-ui/utils';
import { Arrow, ArrowRight } from '@xinxin-ui/xinxin-icons';
import { useYearSelector } from './year-selector';

const gcn = generateClassName('year-selector');
const {
  yearList,
  prevYearSwitch,
  nextYearSwitch,
  switchYear,
} = useYearSelector();
</script>
<template>
  <div :class="[
    gcn.base(),
  ]">
    <!-- 操作栏 -->
    <div :class="gcn.e('operator-bar')">
      <div :class="gcn.e('icon')" @click="prevYearSwitch">
        <arrow />
      </div>
      <div :class="gcn.e('year-range')">
        {{ yearList[0].i }}-{{ yearList[yearList.length - 1].i }}
      </div>
      <div :class="gcn.e('icon')" @click="nextYearSwitch">
        <arrow-right />
      </div>
    </div>
    <!-- 年份面板 -->
    <div :class="gcn.e('year-panel')">
      <div :class="gcn.e('year-wrap')" v-for="year in yearList">
        <span :class="[
          gcn.e('year-wrap', 'text'),
          gcn.middle('year-wrap', 'text').is('current', year.currentYear),
          gcn.middle('year-wrap', 'text').is('select', year.selectYear),
        ]" @click="switchYear(year.i)">
          {{ year.i }}
          <span v-if="year.currentYear" :class="gcn.e('current-year')"></span>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus" src="../style/year-selector.styl"></style>
