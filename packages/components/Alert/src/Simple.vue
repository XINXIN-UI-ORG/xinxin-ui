<script lang="ts" setup>
import { generateClassName } from '@xinxin-ui/utils';
import { alertProps } from './alert';

const gcn = generateClassName('alert');
const props = defineProps(alertProps);

</script>
<template>
  <div :class="gcn.base()">
    {{ props.message }}
  </div>
</template>
<style lang="stylus" scoped src="../style/simple.styl"></style>