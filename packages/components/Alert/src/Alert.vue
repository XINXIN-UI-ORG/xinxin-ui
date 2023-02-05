<script lang="ts" setup>
import { generateClassName } from '@xinxin-ui/utils';
import { defineProps } from 'vue';
import { alertProps } from './alert';

const gcn = generateClassName('alert');

const props = defineProps(alertProps);
</script>
<template>
  <div
    :class="[
      gcn.base(),
      gcn.bm(props.type),
    ]"
  >
    <div :class="gcn.e('box')">
      <div :class="gcn.e('box', 'flag')"></div>
      <div :class="gcn.e('box', 'content')">
        即将突破洛希极限
      </div>
      <div :class="gcn.e('box', 'flag')"></div>
    </div>
  </div>
</template>
<style lang="stylus" src="../style/alert.styl"></style>