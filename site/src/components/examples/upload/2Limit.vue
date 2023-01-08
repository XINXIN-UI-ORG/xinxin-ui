<script lang="ts" setup>
import { XMessage } from 'xinxin-ui';

function beforeUploadCheck(rawFile: File) {
  console.log(rawFile.type);
  if (!rawFile.type.includes('image')) {
    XMessage({
      message: '只能上传图片',
      type: 'error',
    });
    return false;
  }

  if (rawFile.size / 1024 / 1024 > 1) {
    XMessage({
      message: '文件大小不能超过1MB',
      type: 'error',
    });
    return false;
  }

  return true;
}

function beforeUploadCheckWithPromise() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve()
      } else {
        XMessage('已取消上传');
        reject();
      }
    }, 3000);
  });
}
</script>
<template>
  <div>
    <x-upload
      action="http://localhost:30000/api/uploadimg"
      method="POST"
      prompt="文件大小不能超过10M且文件类型只能是图片"
      :before-upload="beforeUploadCheck"
    ></x-upload>
  </div>
  <div>
    <x-upload
      action="http://localhost:30000/api/uploadimg"
      method="POST"
      prompt="文件大小不能超过10M且文件类型只能是图片"
      replace
      :before-upload="beforeUploadCheckWithPromise"
    ></x-upload>
  </div>
</template>