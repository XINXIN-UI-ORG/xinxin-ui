<script lang="ts">
import { defineComponent, ref } from 'vue';
import { uploadProps, useUpload } from './upload';
import { generateClassName } from '@xinxin-ui/utils';
import { Upload } from '@xinxin-ui/xinxin-icons';

export default defineComponent({
  name: 'x-upload',
  props: uploadProps,
  setup() {
    const gcn = generateClassName('upload');
    const fileInputRef = ref();
    const { fileOnChange } = useUpload();

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
  },
});
</script>
<template>
  <div
    :class="[
      gcn.base(),
    ]"
    @click="uploadFile"
  >
    <input
      :class="[
        gcn.e('file'),
      ]"
      type="file"
      ref="fileInputRef"
      @change="fileOnChange"
    >
    <slot>
      <div :class="gcn.e('default')">
        <Upload :class="gcn.e('default', 'icon')" />
        <span :class="gcn.e('default', 'text')">{{ uploadText }}</span>
      </div>
    </slot>
  </div>
</template>
<style scoped lang="stylus" src="../style/upload.styl"></style>