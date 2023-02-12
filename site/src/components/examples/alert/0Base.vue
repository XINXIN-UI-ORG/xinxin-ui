<script lang="ts" setup>
import { XAlert } from 'xinxin-ui';

function alertError() {
  const close = XAlert({
    type: 'error',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}

function alertWarning() {
  const close = XAlert({
    type: 'warning',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}
</script>
<template>
  <x-button @click="alertError" type="error">错误</x-button>
  <x-button @click="alertWarning" type="warning">告警</x-button>
</template>