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
    const {
      fileOnChange,
      fileList,
      dragOver,
      dragDrop,
      submit,
    } = useUpload(props, emit, fileInputRef);

    return {
      gcn,
      fileInputRef,
      uploadFile() {
        fileInputRef.value.click();
      },
      fileOnChange,
      fileList,
      dragOver,
      dragDrop,
      submit,
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
      gcn.is('drag', drag),
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
            <slot name="uploadTrigger"></slot>
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
          <div
            :class="[
              gcn.e('drag'),
              gcn.middle('drag').is('over', dragOver),
            ]"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="dragDrop($event)"
          >
            <div :class="gcn.e('drag', 'icon')">
              <Upload />
            </div>
            <div :class="gcn.e('drag', 'info')">
              <slot name="dragMain">
                点击上传文件或拖拽文件到这里
              </slot>
            </div>
            <div :class="gcn.e('drag', 'tips')">
              <slot name="dragText">
                支持任意类型文件
              </slot>
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