<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<script lang="ts" setup>
import { XAlert } from 'xinxin-ui';

function alertError() {
  const close = XAlert({
    type: 'error',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}

function alertWarning() {
  const close = XAlert({
    type: 'warning',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}

function alertSuccess() {
  const close = XAlert({
    type: 'success',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}

function alertInfo() {
  const close = XAlert({
    type: 'info',
    message: '即将突破洛希极限',
  });

  setTimeout(close, 3000);
}
<\/script>
<template>
  <x-button @click="alertError" type="error">错误</x-button>
  <x-button @click="alertWarning" type="warning">告警</x-button>
  <x-button @click="alertSuccess" type="success">成功</x-button>
  <x-button @click="alertInfo" type="info">信息</x-button>
</template>`

import Simple from './1Simple.vue'

const simpleContent = `<script lang="ts" setup>

<\/script>
<template>
  知乎极简风格通知
  <x-button>极简风格info</x-button>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Simple,
      simpleContent,
      simpleInfo: info.simple,

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
    <template #right>
      <CodeExample
        id="simple"
        :code="simpleContent"
        :title="simpleInfo.title"
        :code-v-node="Simple"
        :code-desc="simpleInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
