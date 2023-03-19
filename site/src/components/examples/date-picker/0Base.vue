<script lang="ts" setup>
import { ref } from 'vue';

const date = ref<string>('2023-03-14');
</script>
<template>
  <x-date-picker placeholder="请选择日期" v-model="date"></x-date-picker>
</template>