<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
    setup() {
        const form = reactive({
            name: "",
            age: 0,
        });

        return {
            form,
            labelPosition: ref<string>('left'),
            size: ref<string>('default'),
        };
    },
});
<\/script>
<template>
    <x-radio-group v-model="labelPosition">
        <x-radio-button value="left">
            Left
        </x-radio-button>
        <x-radio-button value="right">
            Right
        </x-radio-button>
        <x-radio-button value="top">
            Top
        </x-radio-button>
    </x-radio-group>
    <span class="separator"></span>
    <x-radio-group v-model="size">
        <x-radio-button value="large">
            large
        </x-radio-button>
        <x-radio-button value="default">
            default
        </x-radio-button>
        <x-radio-button value="small">
            small
        </x-radio-button>
    </x-radio-group>
    
    <div class="split"></div>
    <div class="split"></div>
    
    <x-form :label-position="labelPosition" :size="size">
        <x-form-item label="姓名">
            <x-input placeholder="请输入姓名" v-model="form.name" />
        </x-form-item>
        <x-form-item label="年龄是">
            <x-number-input placeholder="请输入年龄" v-model="form.age" number-button />
        </x-form-item>
    </x-form>

    {{ form }}
</template>`

import Size from './1Size.vue'

const sizeContent = `<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
    setup() {
        const form = reactive({
            name: "",
            age: 0,
        });

        return {
            form,
            labelPosition: ref<string>('left'),
            size: ref<string>('default'),
        };
    },
});
<\/script>
<template>
    <x-radio-group v-model="labelPosition">
        <x-radio-button value="left">
            Left
        </x-radio-button>
        <x-radio-button value="right">
            Right
        </x-radio-button>
        <x-radio-button value="top">
            Top
        </x-radio-button>
    </x-radio-group>
    <span class="separator"></span>
    <x-radio-group v-model="size">
        <x-radio-button value="large">
            large
        </x-radio-button>
        <x-radio-button value="default">
            default
        </x-radio-button>
        <x-radio-button value="small">
            small
        </x-radio-button>
    </x-radio-group>
    
    <div class="split"></div>
    <div class="split"></div>
    
    <x-form :label-position="labelPosition" :size="size">
        <x-form-item label="姓名">
            <x-input placeholder="请输入姓名" v-model="form.name" />
        </x-form-item>
        <x-form-item label="年龄是">
            <x-number-input placeholder="请输入年龄" v-model="form.age" number-button />
        </x-form-item>
    </x-form>

    {{ form }}
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
        id="size"
        :code="sizeContent"
        :title="sizeInfo.title"
        :code-v-node="Size"
        :code-desc="sizeInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
