<script lang="ts">
import { defineComponent, ref } from 'vue';
import { uploadProps, useUpload, UploadProps, uploadEmits } from './upload';
import { generateClassName } from '@xinxin-ui/utils';
import { Upload } from '@xinxin-ui/xinxin-icons';
import UploadList from './upload-list.vue';

export default defineComponent({
  name: 'x-upload',
  props: uploadProps,
  emits: uploadEmits,
  setup(props: UploadProps, { emit }) {
    const gcn = generateClassName('upload');
    const fileInputRef = ref();
    const { fileOnChange } = useUpload(props, emit, fileInputRef);

    return {
      gcn,
      fileInputRef,
      uploadFile() {
        fileInputRef.value.click();
      },
      fileOnChange,
    };
  },
  components: {
    Upload,
    UploadList,
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
        <div :class="gcn.middle('position').bm(promptPosition)">
          <div :class="gcn.e('default')">
            <Upload :class="gcn.e('default', 'icon')" />
            <span :class="gcn.e('default', 'text')">{{ uploadText }}</span>
          </div>
          <div
            v-if="prompt"
            :class="gcn.e('prompt')"
          >
            {{ prompt }}
          </div>
        </div>
      </slot>
    </div>
    <!-- 上传文件列表 -->
    <UploadList />
  </div>
</template>
<style scoped lang="stylus" src="../style/upload.styl"></style>