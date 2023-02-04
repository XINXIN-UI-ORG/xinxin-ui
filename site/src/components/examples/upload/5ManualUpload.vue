<script lang="ts" setup>
import { ref } from 'vue';
import type { UploadInstance } from 'xinxin-ui';

const uploadRef = ref<UploadInstance>();

function uploadFiles() {
  uploadRef.value?.submit();
}
</script>
<template>
  <x-upload
    ref="uploadRef"
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    :auto-upload="false"
  >
    <template #uploadTrigger>
      <x-button dashed type="success" class="manual-upload" @click="uploadFiles" style="margin: 0;">开始上传</x-button>
    </template>
  </x-upload>
</template>
<style lang="stylus" scoped>
.manual-upload
  margin-left 10px !important
</style>