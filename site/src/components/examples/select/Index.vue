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
                    label: "襄阳歌-李白",
                    value: "1"
                },
                {
                    label: "采莲曲-李白",
                    value: "2"
                },
                {
                    label: "石鼓歌-韩愈",
                    value: "3",
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: "4"
                },
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

import Size from './1Size.vue'

const sizeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            small: ref(""),
            normal: ref(""),
            large: ref(""),
            options: [
                {
                    label: "古风 其十九",
                    value: "1"
                },
                {
                    label: "送别得书字",
                    value: "2"
                },
                {
                    label: "庐山谣寄卢侍御虚舟",
                    value: "3"
                },
            ],
        };
    },
})
<\/script>
<template>
    <x-select
        :options="options"
        placeholder="Small"
        v-model="small"
        block
        size="small"
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Normal"
        v-model="normal"
        block
        size="normal"
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Large"
        v-model="large"
        block
        size="large"
    >
    </x-select>
</template>`

import Disabled from './2Disabled.vue'

const disabledContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref(""),
            options: [
                {
                    label: "襄阳歌-李白",
                    value: "1"
                },
                {
                    label: "采莲曲-李白",
                    value: "2"
                },
                {
                    label: "石鼓歌-韩愈",
                    value: "3",
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: "4"
                },
            ],
        };
    },
})
<\/script>
<template>
    <x-select
        :options="options"
        placeholder="Disabled"
        v-model="value"
        disabled
    >
    </x-select>
</template>`

import Clearable from './3Clearable.vue'

const clearableContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref(0),
            options: [
                {
                    label: "襄阳歌-李白",
                    value: 1
                },
                {
                    label: "采莲曲-李白",
                    value: 2
                },
                {
                    label: "石鼓歌-韩愈",
                    value: 3,
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: 4
                },
            ],
        };
    },
})
<\/script>
<template>
    <x-select
        :options="options"
        placeholder="Clearable"
        v-model="value"
        clearable
    >
    </x-select>
</template>`

import Filterable from './4Filterable.vue'

const filterableContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref(""),
            options: [
                {
                    label: "襄阳歌-李白",
                    value: "1"
                },
                {
                    label: "采莲曲-李白",
                    value: "2"
                },
                {
                    label: "石鼓歌-韩愈",
                    value: "3",
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: "4"
                },
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
        filterable
    >
    </x-select>
</template>`

import Multiple from './5Multiple.vue'

const multipleContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref("1"),
            options: [
                {
                    label: "襄阳歌-李白",
                    value: "1"
                },
                {
                    label: "采莲曲-李白",
                    value: "2"
                },
                {
                    label: "石鼓歌-韩愈",
                    value: "3",
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: "4"
                },
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

      Size,
      sizeContent,
      sizeInfo: info.size,

      Disabled,
      disabledContent,
      disabledInfo: info.disabled,

      Clearable,
      clearableContent,
      clearableInfo: info.clearable,

      Filterable,
      filterableContent,
      filterableInfo: info.filterable,

      Multiple,
      multipleContent,
      multipleInfo: info.multiple,

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
        id="disabled"
        :code="disabledContent"
        :title="disabledInfo.title"
        :code-v-node="Disabled"
        :code-desc="disabledInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="filterable"
        :code="filterableContent"
        :title="filterableInfo.title"
        :code-v-node="Filterable"
        :code-desc="filterableInfo.desc"
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
        id="clearable"
        :code="clearableContent"
        :title="clearableInfo.title"
        :code-v-node="Clearable"
        :code-desc="clearableInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="multiple"
        :code="multipleContent"
        :title="multipleInfo.title"
        :code-v-node="Multiple"
        :code-desc="multipleInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
