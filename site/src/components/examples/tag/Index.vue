<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<template>
    <x-tag>乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info">梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success">战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning">北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error">襄阳歌</x-tag>
</template>`

import Closeable from './1Closeable.vue'

const closeableContent = `<script lang="ts">
import { ref, defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        let visible = ref<boolean>(true);
        return {
            preventClose(callback: Function) {
                XMessage("点击这里不会触发关闭");
                callback(false);
            },
            visible,
        };
    },
});
<\/script>
<template>
    <x-tag closeable>乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info" closeable>梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success" closeable>战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning" closeable>北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error" closeable>襄阳歌</x-tag>

    <div class="split"></div>

    <x-tag closeable @close="preventClose" v-model:visible="visible">乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info" closeable @close="preventClose" v-model:visible="visible">梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success" closeable @close="preventClose" v-model:visible="visible">战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning" closeable @close="preventClose" v-model:visible="visible">北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error" closeable @close="preventClose" v-model:visible="visible">襄阳歌</x-tag>

    <div class="split"></div>
    <x-button @click="visible = false">手动关闭</x-button>
</template>
`

import Size from './2Size.vue'

const sizeContent = `<template>
    <x-tag type="info" size="small">采莲曲</x-tag>

    <span class="separator"></span>
    <x-tag type="info" size="normal">采莲曲</x-tag>
    
    <span class="separator"></span>
    <x-tag type="info" size="large">采莲曲</x-tag>

    <div class="split"></div>

    <x-tag type="info" size="small" closeable>采莲曲</x-tag>

    <span class="separator"></span>
    <x-tag type="info" size="normal" closeable>采莲曲</x-tag>
    
    <span class="separator"></span>
    <x-tag type="info" size="large" closeable>采莲曲</x-tag>
</template>`

import Theme from './3Theme.vue'

const themeContent = `<template>
    <x-tag closeable>乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info" closeable>梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success" closeable>战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning" closeable>北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error" closeable>襄阳歌</x-tag>

    <div class="split"></div>

    <x-tag theme="ghost" closeable>乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info" theme="ghost" closeable>梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success" theme="ghost" closeable>战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning" theme="ghost" closeable>北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error" theme="ghost" closeable>襄阳歌</x-tag>

    <div class="split"></div>

    <x-tag theme="fill" closeable>乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info" theme="fill" closeable>梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success" theme="fill" closeable>战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning" theme="fill" closeable>北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error" theme="fill" closeable>襄阳歌</x-tag>
</template>`

import Round from './4Round.vue'

const roundContent = `<template>
    <x-tag>乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info">梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success">战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning">北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error">襄阳歌</x-tag>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Closeable,
      closeableContent,
      closeableInfo: info.closeable,

      Size,
      sizeContent,
      sizeInfo: info.size,

      Theme,
      themeContent,
      themeInfo: info.theme,

      Round,
      roundContent,
      roundInfo: info.round,

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
        id="size"
        :code="sizeContent"
        :title="sizeInfo.title"
        :code-v-node="Size"
        :code-desc="sizeInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="round"
        :code="roundContent"
        :title="roundInfo.title"
        :code-v-node="Round"
        :code-desc="roundInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="closeable"
        :code="closeableContent"
        :title="closeableInfo.title"
        :code-v-node="Closeable"
        :code-desc="closeableInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="theme"
        :code="themeContent"
        :title="themeInfo.title"
        :code-v-node="Theme"
        :code-desc="themeInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
