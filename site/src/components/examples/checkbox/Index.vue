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
        let checkboxValue = ref(false);
        return {
            checkboxValue,
        };
    },
})
<\/script>
<template>
    <x-checkbox v-model:checked="checkboxValue" label="复选框"></x-checkbox>
    &nbsp;
    <x-checkbox v-model:checked="checkboxValue">复选框在slot</x-checkbox>
</template>`

import Disabled from './1Disabled.vue'

const disabledContent = `<template>
sfd
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Disabled,
      disabledContent,
      disabledInfo: info.disabled,

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
