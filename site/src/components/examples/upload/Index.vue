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

function fileExceedLimit() {
    XMessage({
        type: 'error',
        message: '文件上传个数超过限制',
    });
}
<\/script>
<template>
    <x-upload v-model:file-list="fileList" :limit="3" :on-exceed="fileExceedLimit"></x-upload>
</template>
`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

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
    </template>
    <template #right> </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
