<script lang="ts" setup>
import { XAlert } from 'xinxin-ui';

function alertError() {
  XAlert();
}

</script>
<template>
  <x-button @click="alertError">错误</x-button>
</template>