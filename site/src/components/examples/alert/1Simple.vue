<script lang="ts" setup>
import { XAlert } from 'xinxin-ui';

function info() {
  XAlert({
    message: '极简风格info',
    type: 'info',
    style: 'simple',
  });
}
</script>
<template>
  <x-button @click="info">极简风格info</x-button>
</template>