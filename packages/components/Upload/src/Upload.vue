<script lang="ts">
import { defineComponent, ref } from 'vue';
import { uploadProps, useUpload, UploadProps, uploadEmits } from './upload';
import { generateClassName } from '@xinxin-ui/utils';
import { Upload, Add } from '@xinxin-ui/xinxin-icons';
import UploadList from './upload-list.vue';

export default defineComponent({
  name: 'x-upload',
  props: uploadProps,
  emits: uploadEmits,
  setup(props: UploadProps, { emit }) {
    const gcn = generateClassName('upload');
    const fileInputRef = ref();
    const { fileOnChange, fileList } = useUpload(props, emit, fileInputRef);

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
    UploadList,
    Add,
  },
});
</script>
<template>
  <div
    :class="[
      gcn.base(),
      gcn.bm(listType),
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
    <UploadList v-if="listType === 'picture'" />
    <div @click="uploadFile">
      <slot>
        <template v-if="!drag">
          <!-- 卡片模式 -->
          <div v-if="listType === 'card'" :class="gcn.middle('position').bm(promptPosition)">
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
          <!-- 图片模式 -->
          <div
            v-else-if="listType === 'picture' && fileList.length < (limit ?? Infinity)"
            :class="gcn.e('picture')"  
          >
            <Add />
          </div>
        </template>
        <template v-else>
          <div :class="gcn.e('drag')">
            <div :class="gcn.e('drag', 'icon')">
              <Upload />
            </div>
            <div :class="gcn.e('drag', 'tips')">
              拖拽到此处上传
            </div>
          </div>
        </template>
      </slot>
    </div>
    <!-- 上传文件列表 -->
    <UploadList v-if="listType === 'card'" />
  </div>
</template>
<style scoped lang="stylus" src="../style/upload.styl"></style>