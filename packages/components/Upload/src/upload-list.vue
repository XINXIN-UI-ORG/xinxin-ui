<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { generateClassName } from '@xinxin-ui/utils';
import { UploadKey } from '@xinxin-ui/symbols';
import { File, Close, InfoMessage, ErrorMessage } from '@xinxin-ui/xinxin-icons';
import { FileUploadEnum, UploadFile } from '@xinxin-ui/typings';
import { NOOP } from '@vue/shared';

export default defineComponent({
  setup() {
    const gcn = generateClassName('upload');
    const { fileList, handleRemove, listType } = inject(UploadKey, {
      fileList: ref<UploadFile[]>([]),
      handleRemove: NOOP,
      listType: 'card',
    });

    return {
      gcn,
      fileList,
      handleRemove,
      fileStatus: FileUploadEnum,
      listType,
    };
  },
  components: {
    File,
    Close,
    InfoMessage,
    ErrorMessage,
  },
});
</script>
<template>
  <div v-if="listType === 'card'" :class="gcn.e('files')">
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
  <TransitionGroup name="file" v-else-if="listType === 'picture'">
    <div
      v-for="file in fileList"
      :key="file.id"
      :class="[
        gcn.e('pictures', 'block'),
        gcn.middle('pictures', 'block').bm(file.status!),
      ]"
    >
      <img :class="gcn.e('pictures', 'block', 'image')" :src="file.url" :alt="file.name">
      <!-- 删除 -->
      <div
        :class="[
          gcn.e('pictures', 'block', 'delete'),
          gcn.is('transparent', Boolean(file.status && file.status === fileStatus.PROGRESS)),
        ]"
      >
        <ErrorMessage @click="handleRemove(file)" />
      </div>
      <!-- 上传状态 -->
      <div :class="gcn.e('pictures', 'block', 'upload')" v-show="file.status && file.status === fileStatus.PROGRESS">
        <svg viewBox="0 0 100 100">
          <path
            d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
            fill="none"
            stroke="#e5e9f2"
            stroke-width="18"
          ></path>
          <path
            d="M 50 50 m -40 0 a 40 40 0 1 0 80 0  a 40 40 0 1 0 -80 0"
            fill="none"
            stroke="#3bb346"
            stroke-linecap="round"
            :class="gcn.e('progress')"
            stroke-width="18"
            :style="{
              strokeDasharray: `${2.5 * (file.progress ?? 0)}px, 250px`
            }"
          ></path>
        </svg>
      </div>
      <!-- 错误标识 -->
      <InfoMessage v-if="file.status && file.status === fileStatus.FAIL" :class="gcn.e('error-flag')" />
    </div>
  </TransitionGroup>
</template>
<style scoped lang="stylus" src="../style/upload.styl"></style>
