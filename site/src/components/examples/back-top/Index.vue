<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<template>
    <x-top />
</template>`

import ListenTarget from './1ListenTarget.vue'

const listenTargetContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            topRef: ref(null),
        };
    },
});
<\/script>
<template>
    <h3>传入ref对象:</h3>
    <div style="height: 50px; border: 1px solid #eee; overflow: auto; padding-left: 10px"
         ref="topRef">
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
    </div>
    <x-top :listen-element="topRef" bottom="32rem" />
    <h3>传入类名:</h3>
    <div class="top-ref"
         style="height: 50px; border: 1px solid #eee; overflow: auto; padding-left: 10px">
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
    </div>
    <x-top listen-element=".top-ref" bottom="28rem" />
</template>
`

import CustomerContent from './2CustomerContent.vue'

const customerContentContent = `<template>
    <div style="height: 50px; border: 1px solid #eee; overflow: auto; padding-left: 10px"
         class="customer-content">
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
        <p>自定义内容</p>
    </div>
    <x-top bottom="20rem" listen-element=".customer-content">
        <div
            style="
            height: 50px;
            width: 50px;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 50px;
            color: #1989fa;
        "
        >
            UP
        </div>
    </x-top>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      ListenTarget,
      listenTargetContent,
      listenTargetInfo: info.listenTarget,

      CustomerContent,
      customerContentContent,
      customerContentInfo: info.customerContent,

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
        id="customerContent"
        :code="customerContentContent"
        :title="customerContentInfo.title"
        :code-v-node="CustomerContent"
        :code-desc="customerContentInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="listenTarget"
        :code="listenTargetContent"
        :title="listenTargetInfo.title"
        :code-v-node="ListenTarget"
        :code-desc="listenTargetInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
