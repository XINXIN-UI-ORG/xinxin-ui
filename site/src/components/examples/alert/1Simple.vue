<script lang="ts" setup>
import { XAlert } from 'xinxin-ui';

function info() {
  XAlert({
    message: '极简风格info',
    type: 'info',
    style: 'simple',
  });
}

function infoDuration() {
  XAlert({
    message: '极简风格信息',
    type: 'info',
    style: 'simple',
    duration: 1000,
  });
}

function success() {
  XAlert({
    message: '极简风格成功',
    type: 'success',
    style: 'simple',
  });
}

function warning() {
  XAlert({
    message: '极简风格警告',
    type: 'warning',
    style: 'simple',
  });
}

function error() {
  XAlert({
    message: '极简风格错误',
    type: 'error',
    style: 'simple',
  });
}
</script>
<template>
  <x-button @click="info">信息</x-button>
  <x-button @click="success" type="success">成功</x-button>
  <x-button @click="warning" type="warning">警告</x-button>
  <x-button @click="error" type="error">错误</x-button>
  <x-button @click="infoDuration">1s</x-button>
</template>