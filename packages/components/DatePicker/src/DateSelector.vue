<script setup lang="ts">
import { generateClassName } from '@xinxin-ui/utils';

const gcn = generateClassName('date-selector');
</script>
<template>
  <div
    :class="[
      gcn.base(),
    ]"
  >
    works
  </div>
</template>