<script setup lang="ts">
import { generateClassName } from '@xinxin-ui/utils';
import { useDateSelector } from './date-selector';

const gcn = generateClassName('date-selector');
const { DATE_LIST, dateList } = useDateSelector();
</script>
<template>
  <div
    :class="[
      gcn.base(),
    ]"
  >
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
          ]"
        >
          {{ item.i }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus" src="../style/date-selector.styl"></style>