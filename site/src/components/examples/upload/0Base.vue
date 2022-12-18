<script lang="ts" setup>
import { ref } from 'vue';
import { UploadFile, XMessage } from 'xinxin-ui';

const fileList = ref<UploadFile[]>([
  {
    name: 'avatar.jpg',
    url: 'https://avatars.githubusercontent.com/u/34062997?s=40&v=4',
    type: 'image/jpg',
    size: 130,
  },
  {
    name: 'test.txt',
    url: 'https://avatars.githubusercontent.com/u/34062997?s=40&v=4',
    size: 150,
  },
]);

function fileExceedLimit(files: FileList, fileList: UploadFile[]) {
    XMessage({
        type: 'error',
        message: '文件上传个数超过限制',
    });

    console.log('本次上传的文件：', files, '已上传的文件列表：', fileList);
}

function fileRemove(file: UploadFile, fileList: UploadFile[]) {
    XMessage({
        type: 'error',
        message: '移除成功',
    });

    console.log('本次移除的文件：', file, '已上传的文件列表：', fileList);
}

function fileBeforeRemove(file: UploadFile, fileList: UploadFile[]) {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            console.log('本次移除的文件：', file, '已上传的文件列表：', fileList);
            resolve();
        }, 3000);
    });
}
</script>
<template>
    <x-upload
        v-model:file-list="fileList"
        :limit="5"
        @on-exceed="fileExceedLimit"
        @on-remove="fileRemove"
        :before-remove="fileBeforeRemove"
        action="http://localhost:30000/api/uploadimg"
        method="POST"
    ></x-upload>
</template>
