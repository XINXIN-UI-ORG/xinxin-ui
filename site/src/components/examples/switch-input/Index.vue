<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
            value2: ref<boolean>(false),
        };
    },
});
<\/script>
<template>
    <x-switch v-model="value"></x-switch>
    &nbsp;
    <x-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
    >
    </x-switch>
</template>`

import Size from './1Size.vue'

const sizeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
            value2: ref<boolean>(false),
        };
    },
});
<\/script>
<template>
    <x-switch v-model="value" size="small"></x-switch>
    &nbsp;
    <x-switch v-model="value" size="normal"></x-switch>
    &nbsp;
    <x-switch v-model="value" size="large"></x-switch>
</template>`

import Content from './2Content.vue'

const contentContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
        };
    },
});
<\/script>
<template>
    <x-switch
        v-model="value"
        inactive-text="我本楚狂人，凤歌笑孔丘。"
        active-text="手持绿玉杖，朝别黄鹤楼。"
    >
    </x-switch>
</template>`

import Disabled from './3Disabled.vue'

const disabledContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
        };
    },
});
<\/script>
<template>
    <x-switch
        v-model="value"
        disabled
    >
    </x-switch>
</template>`

import Loading from './4Loading.vue'

const loadingContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
        };
    },
});
<\/script>
<template>
    <x-switch
        v-model="value"
        disabled
    >
    </x-switch>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Size,
      sizeContent,
      sizeInfo: info.size,

      Content,
      contentContent,
      contentInfo: info.content,

      Disabled,
      disabledContent,
      disabledInfo: info.disabled,

      Loading,
      loadingContent,
      loadingInfo: info.loading,

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
        id="content"
        :code="contentContent"
        :title="contentInfo.title"
        :code-v-node="Content"
        :code-desc="contentInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="loading"
        :code="loadingContent"
        :title="loadingInfo.title"
        :code-v-node="Loading"
        :code-desc="loadingInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="size"
        :code="sizeContent"
        :title="sizeInfo.title"
        :code-v-node="Size"
        :code-desc="sizeInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="disabled"
        :code="disabledContent"
        :title="disabledInfo.title"
        :code-v-node="Disabled"
        :code-desc="disabledInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
