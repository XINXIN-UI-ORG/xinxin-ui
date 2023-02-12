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

function alertSuccess() {
  const close = XAlert({
    type: 'success',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}

function alertInfo() {
  const close = XAlert({
    type: 'info',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}
</script>
<template>
  <x-button @click="alertError" type="error">错误</x-button>
  <x-button @click="alertWarning" type="warning">告警</x-button>
  <x-button @click="alertSuccess" type="success">成功</x-button>
  <x-button @click="alertInfo" type="info">信息</x-button>
</template>