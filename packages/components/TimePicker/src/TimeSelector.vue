<script lang="ts" setup>
import { generateClassName } from '@xinxin-ui/utils';
const gcn = generateClassName('time-selector');
</script>
<template>
  <div :class="gcn.e('wrap')">
    <div :class="[
      gcn.e('slider'),
    ]">
      
    </div>
    <div :class="[
      gcn.e('slider'),
    ]">
    </div>
    <div :class="[
      gcn.e('slider'),
    ]">
    </div>
  </div>
</template>
<style lang="stylus" scoped src="../style/time-selector.styl"></style>