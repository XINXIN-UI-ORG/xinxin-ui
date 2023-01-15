<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<script lang="ts" setup>
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
        }, 500);
    });
}
<\/script>
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
`

import Replace from './1Replace.vue'

const replaceContent = `<template>
  <div>
    <x-upload
      action="http://localhost:30000/api/uploadimg"
      method="POST"
      prompt="上传文件可替换"
      replace
    ></x-upload>
  </div>
  <div>
    <x-upload
      action="http://localhost:30000/api/uploadimg"
      method="POST"
      prompt="上传文件可替换"
      prompt-position="left"
    ></x-upload>
  </div>
  <div>
    <x-upload
      action="http://localhost:30000/api/uploadimg"
      method="POST"
      prompt="上传文件可替换"
      prompt-position="bottom"
    ></x-upload>
  </div>
</template>`

import Limit from './2Limit.vue'

const limitContent = `<script lang="ts" setup>
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
<\/script>
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
</template>`

import Picture from './3Picture.vue'

const pictureContent = `<script lang="ts" setup>
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
<\/script>
<template>
  <x-upload
    :file-list="fileList"
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    list-type="picture"
    :limit="5"
  ></x-upload>
</template>`

import Drag from './4Drag.vue'

const dragContent = `<script lang="ts" setup>
<\/script>
<template>
  <x-upload
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    drag
  ></x-upload>

  <x-upload
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    drag
  >
    <template #dragMain>
      上传文件拖拽到这里
    </template>
    <template #dragText>
      支持上传图片
    </template>
  </x-upload>
</template>`

import ManualUpload from './5ManualUpload.vue'

const manualUploadContent = `<script lang="ts" setup>
import { ref } from 'vue';
import type { UploadInstance } from 'xinxin-ui';

const uploadRef = ref<UploadInstance>();

function uploadFiles() {
  uploadRef.value?.submit();
}
<\/script>
<template>
  <x-upload
    ref="uploadRef"
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    :auto-upload="false"
  >
    <template #uploadTrigger>
      <x-button dashed type="success" class="manual-upload" @click="uploadFiles">开始上传</x-button>
    </template>
  </x-upload>
</template>
<style lang="stylus">
.x-button
  margin 0 !important
</style>
<style lang="stylus" scoped>
.manual-upload
  margin-left 10px !important
</style>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Replace,
      replaceContent,
      replaceInfo: info.replace,

      Limit,
      limitContent,
      limitInfo: info.limit,

      Picture,
      pictureContent,
      pictureInfo: info.picture,

      Drag,
      dragContent,
      dragInfo: info.drag,

      ManualUpload,
      manualUploadContent,
      manualUploadInfo: info.manualUpload,

      apiProps: info.apiProps,
      apiEvent: info.apiEvent,
    }
  },
  components: {
    Layout,
    CodeExample,
    Table,
  },
})
</script>
<template>
  <Layout>
    <template #left>
      <CodeExample
        id="base"
        :code="baseContent"
        :title="baseInfo.title"
        :code-v-node="Base"
        :code-desc="baseInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="limit"
        :code="limitContent"
        :title="limitInfo.title"
        :code-v-node="Limit"
        :code-desc="limitInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="drag"
        :code="dragContent"
        :title="dragInfo.title"
        :code-v-node="Drag"
        :code-desc="dragInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="replace"
        :code="replaceContent"
        :title="replaceInfo.title"
        :code-v-node="Replace"
        :code-desc="replaceInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="picture"
        :code="pictureContent"
        :title="pictureInfo.title"
        :code-v-node="Picture"
        :code-desc="pictureInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="manualUpload"
        :code="manualUploadContent"
        :title="manualUploadInfo.title"
        :code-v-node="ManualUpload"
        :code-desc="manualUploadInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
