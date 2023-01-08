<script lang="ts" setup>
import { UploadFile } from 'xinxin-ui';
import { ref } from 'vue';

const fileList = ref<UploadFile[]>([
  {
    name: 'avatar.jpg',
    url: 'https://tupian.qqw21.com/article/UploadPic/2021-4/2021421831597782.jpeg',
    type: 'image/jpg',
    size: 130,
  },
  {
    name: 'avatar1.jpg',
    url: 'https://tupian.qqw21.com/article/UploadPic/2021-3/202132821452952031.jpeg',
    type: 'image/jpg',
    size: 130,
  },
]);
</script>
<template>
  <x-upload
    :file-list="fileList"
    action="http://localhost:30000/api/uploadimg1"
    method="POST"
    list-type="picture"
  ></x-upload>
</template>