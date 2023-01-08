<script lang="ts">
import { defineComponent, inject } from 'vue';
import { generateClassName } from '@xinxin-ui/utils';
import { UploadKey } from '@xinxin-ui/symbols';
import { File, Close, InfoMessage } from '@xinxin-ui/xinxin-icons';
import { FileUploadEnum } from '@xinxin-ui/typings';
import { NOOP } from '@vue/shared';

export default defineComponent({
  setup() {
    const gcn = generateClassName('upload');
    const { fileList, handleRemove } = inject(UploadKey, { fileList: [], handleRemove: NOOP });

    return {
      gcn,
      fileList,
      handleRemove,
      fileStatus: FileUploadEnum,
    };
  },
  components: {
    File,
    Close,
    InfoMessage,
  },
});
</script>
<template>
  <div :class="gcn.e('files')">
    <TransitionGroup name="file">
      <div
        v-for="file of fileList"
        :key="file.id"
        :class="[
          gcn.e('files', 'block'),
          gcn.middle('files', 'block').bm(file.status!),
        ]"
      >
        <div :class="gcn.e('files', 'block', 'display')">
          <div v-if="file.isImage" :class="gcn.e('files', 'block', 'display', 'img')">
            <img :src="file.url">
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
          <!-- 上传进度或结果 -->
          <div :class="gcn.e('files', 'block', 'main', 'progress')">
            <div
              v-if="file.status && [fileStatus.PROGRESS, fileStatus.READY].includes(file.status)"
              :class="gcn.e('files', 'block', 'main', 'progress', 'wrap')"
            >
              <div :class="gcn.e('files', 'block', 'main', 'progress', 'bar')" :style="'width: ' + (file.progress ?? 0) + '%'"></div>
            </div>
            <div v-else-if="file.status === fileStatus.FAIL" :class="gcn.e('files', 'block', 'main', 'progress', 'error')">
              <InfoMessage :class="gcn.e('error-icon')" />
              <div>上传失败</div>
            </div>
          </div>
        </div>
        <div :class="gcn.e('files', 'block', 'close')" @click="handleRemove(file)">
          <Close :class="gcn.e('close')" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<style scoped lang="stylus" src="../style/upload.styl"></style>
