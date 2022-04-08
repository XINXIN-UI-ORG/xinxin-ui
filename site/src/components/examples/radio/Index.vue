<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

export default defineComponent({
  setup() {
    return {
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
    <template #left> </template>
    <template #right> </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
