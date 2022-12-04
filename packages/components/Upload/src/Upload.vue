<script lang="ts">
import { defineComponent, ref } from 'vue';
import { uploadProps, useUpload } from './upload';
import { generateClassName } from '@xinxin-ui/utils';
import { Upload, File, Close } from '@xinxin-ui/xinxin-icons';

export default defineComponent({
  name: 'x-upload',
  props: uploadProps,
  setup() {
    const gcn = generateClassName('upload');
    const fileInputRef = ref();
    const { fileOnChange, fileList } = useUpload();

    return {
      gcn,
      fileInputRef,
      uploadFile() {
        fileInputRef.value.click();
      },
      fileOnChange,
      fileList,
    };
  },
  components: {
    Upload,
    File,
    Close,
  },
});
</script>
<template>
  <div
    :class="[
      gcn.base(),
    ]"
  >
    <input
      :class="[
        gcn.e('file'),
      ]"
      type="file"
      ref="fileInputRef"
      @change="fileOnChange"
    >
    <div @click="uploadFile">
      <slot>
        <div :class="gcn.e('default')">
          <Upload :class="gcn.e('default', 'icon')" />
          <span :class="gcn.e('default', 'text')">{{ uploadText }}</span>
        </div>
      </slot>
    </div>
    <div :class="gcn.e('files')">
      <template v-for="file of fileList" :key="file.id">
        <div :class="gcn.e('files', 'block')">
          <div :class="gcn.e('files', 'block', 'display')">
            <div v-if="file.isImage" :class="gcn.e('files', 'block', 'display', 'img')">
              <img :src="file.imageContent">
            </div>
            <div v-else :class="gcn.e('files', 'block', 'display', 'normal-file')">
              <File :class="gcn.e('document')" />
            </div>
          </div>
          <div :class="gcn.e('files', 'block', 'main')">
            <div :class="gcn.e('files', 'block', 'main', 'info')">
              <div :class="gcn.e('files', 'block', 'main', 'info', 'name')">
                {{ file.name }}
              </div>
              <div :class="gcn.e('files', 'block', 'main', 'info', 'size')">
                {{ file.size }}KB
              </div>
            </div>
            <div :class="gcn.e('files', 'block', 'main', 'progress')">
              <!-- 上传进度条 -->
            </div>
          </div>
          <div :class="gcn.e('files', 'block', 'close')">
            <Close :class="gcn.e('close')" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="stylus" src="../style/upload.styl"></style>