<script setup lang="ts">
import { generateClassName } from '@xinxin-ui/utils';
import { Left, Right, Arrow, ArrowRight } from '@xinxin-ui/xinxin-icons';
import { useDatePanel } from './date-selector';
import XButton from '../../XButton';

const gcn = generateClassName('date-selector');
const {
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
} = useDatePanel();
</script>
<template>
  <!-- 操作栏 -->
  <header :class="gcn.e('operation-bar')">
    <div
      :class="[
        gcn.e('operation-icon'),
      ]"
      @click="prevYear"
    >
      <Arrow />
    </div>
    <div
      :class="[
        gcn.e('operation-icon'),
      ]"
      @click="prevMonth"
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
      @click="nextMonth"
    >
      <Right />
    </div>
    <div
      :class="[
        gcn.e('operation-icon'),
      ]"
      @click="nextYear"
    >
      <ArrowRight />
    </div>
  </header>
  <!-- 日期面板 -->
  <article :class="gcn.e('selector')">
    <div :class="gcn.e('title')">
      <div
        v-for="item in DATE_LIST"
        :class="gcn.e('title', 'item')"
      >
        {{ item }}
      </div>
    </div>
    <div :class="gcn.e('date')">
      <div
        v-for="line in dateList"
        :class="gcn.e('date', 'line')"
      >
        <div
          v-for="item in line"
          :class="[
            gcn.e('date', 'item'),
            gcn.middle('date', 'item').is('forbidden', item.type === 0),
            gcn.middle('date', 'item').is('select', item.selectDay),
          ]"
          @click="selectDate(item.year, item.month, item.i)"
        >
          {{ item.i }}
          <span v-if="item.today" :class="gcn.e('today')"></span>
        </div>
      </div>
    </div>
  </article>
  <!-- 快捷栏 -->
  <footer :class="gcn.e('shotcut')">
    <div :class="gcn.e('shotcut', 'now')">
      <XButton
        size="mini"
        dashed
        type="warning"
        @click="selectCurrentDate"
      >此刻</XButton>
    </div>
  </footer>
</template>
<style lang="stylus" scoped src="../style/date-selector.styl"></style>
