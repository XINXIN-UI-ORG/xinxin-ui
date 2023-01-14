<script lang="ts" setup>
</script>
<template>
  <x-upload
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    drag
  ></x-upload>

  <x-upload
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    drag
  >
    <template #dragMain>
      上传文件拖拽到这里
    </template>
    <template #dragText>
      支持上传图片
    </template>
  </x-upload>
</template>