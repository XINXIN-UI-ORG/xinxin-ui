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
        let loading = ref<boolean>(false);

        return {
            value: ref<boolean>(false),
            value2: ref<boolean>(false),
            loading,
            beforeChange() {
                loading.value = true;
                return new Promise(resolve => {
                    setTimeout(() => {
                        loading.value = false;
                        resolve(true);
                    }, 2000);
                });
            },
        };
    },
});
<\/script>
<template>
    <x-switch
        v-model="value"
        loading
    >
    </x-switch>
    &nbsp;
    <x-switch
        v-model="value2"
        :loading="loading"
        :before-change="beforeChange"
    >
    </x-switch>
</template>`

import SelectValue from './5SelectValue.vue'

const selectValueContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<string>("金陵酒肆留别"),
        };
    },
});
<\/script>
<template>
    <x-switch
        v-model="value"
        active-value="听蜀僧浚弹琴"
        inactive-value="金陵酒肆留别"
    ></x-switch>
    <br>
    {{ value }}
</template>`

import Change from './6Change.vue'

const changeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            value: ref<string>("金陵酒肆留别"),
            change(value: string) {
                XMessage(value);
            },
        };
    },
});
<\/script>
<template>
    <x-switch
        v-model="value"
        active-value="听蜀僧浚弹琴"
        inactive-value="金陵酒肆留别"
        @change-value="change"
    ></x-switch>
</template>`

import CustomerIcon from './7CustomerIcon.vue'

const customerIconContent = `<script lang="ts">
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
    <x-switch v-model="value">
        <template #icon>
            🤔
        </template>
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

      SelectValue,
      selectValueContent,
      selectValueInfo: info.selectValue,

      Change,
      changeContent,
      changeInfo: info.change,

      CustomerIcon,
      customerIconContent,
      customerIconInfo: info.customerIcon,

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

      <CodeExample
        id="change"
        :code="changeContent"
        :title="changeInfo.title"
        :code-v-node="Change"
        :code-desc="changeInfo.desc"
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

      <CodeExample
        id="selectValue"
        :code="selectValueContent"
        :title="selectValueInfo.title"
        :code-v-node="SelectValue"
        :code-desc="selectValueInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="customerIcon"
        :code="customerIconContent"
        :title="customerIconInfo.title"
        :code-v-node="CustomerIcon"
        :code-desc="customerIconInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
