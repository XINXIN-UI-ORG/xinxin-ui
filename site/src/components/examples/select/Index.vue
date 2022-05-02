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
            value: ref("1"),
            options: [
                {
                    label: "襄阳歌",
                    value: "1"
                },
                {
                    label: "采莲曲",
                    value: "2"
                },
                {
                    label: "客中行",
                    value: "3"
                }
            ],
        };
    },
})
<\/script>
<template>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="value"
    >
    </x-select>
</template>`

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
