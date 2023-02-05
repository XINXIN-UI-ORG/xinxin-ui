<script lang="ts" setup>
import { XAlert } from 'xinxin-ui';

function alertError() {
  XAlert({
    type: 'error',
    message: '即将突破洛希极限',
  });
}

</script>
<template>
  <x-button @click="alertError">错误</x-button>
</template>