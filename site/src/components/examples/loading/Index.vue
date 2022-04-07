<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import TargetLoad from './0TargetLoad.vue'

const targetLoadContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad } from "xinxin-ui";

export default defineComponent({
    setup() {
        let targetRef = ref<HTMLDivElement>();
        let load = XLoad({
            description: "加载中..."
        });

        return {
            targetRef,
            loadOnTarget() {
                load?.show(targetRef.value);
                setTimeout(() => {
                    load?.destroy();
                    targetRef.value!.textContent = "数据请求成功，展示数据";
                }, 3000);
            }
        };
    },
})
<\/script>
<template>
    <x-button type="success" @click="loadOnTarget">在目标处加载</x-button>
    <div class="target" ref="targetRef">
        等待数据展示
    </div>
</template>
<style scoped>
.target {
    width: 100%;
    height: 260px;
    line-height: 260px;
    border: 1px solid #aaa;
    margin-top: 10px;
    border-radius: 4px;
    text-align: center;
}
</style>`

import CloseAndDestory from './1CloseAndDestory.vue'

const closeAndDestoryContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad } from "xinxin-ui";

export default defineComponent({
    setup() {
        let targetRef = ref<HTMLDivElement>();
        let load = XLoad({
            description: "加载中..."
        });

        return {
            targetRef,
            loadOnTarget() {
                load?.show(targetRef.value);
            },
            close() {
                load?.close();
            },
            destory() {
                load?.destroy();
            },
        };
    },
})
<\/script>
<template>
    <x-button type="success" @click="loadOnTarget">加载</x-button>
    <x-button type="warning" @click="close">关闭</x-button>
    <x-button type="error" @click="destory">销毁</x-button>
    <div class="target" ref="targetRef">
        等待数据展示
    </div>
</template>
<style scoped>
.target {
    width: 100%;
    height: 260px;
    line-height: 260px;
    border: 1px solid #aaa;
    margin-top: 10px;
    border-radius: 4px;
    text-align: center;
}
</style>`

import CustomerText from './2CustomerText.vue'

const customerTextContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad } from "xinxin-ui";

export default defineComponent({
    setup() {
        let targetRef = ref<HTMLDivElement>();
        let load = XLoad({
            description: "可以选择要加载的文字..."
        });

        return {
            targetRef,
            loadOnTarget() {
                load?.show(targetRef.value);
                setTimeout(() => {
                    load?.destroy();
                    targetRef.value!.textContent = "数据请求成功，展示数据";
                }, 3000);
            }
        };
    },
})
<\/script>
<template>
    <x-button type="info" @click="loadOnTarget">自定义加载文字</x-button>
    <div class="target" ref="targetRef">
        等待数据展示
    </div>
</template>
<style scoped>
.target {
    width: 100%;
    height: 260px;
    line-height: 260px;
    border: 1px solid #aaa;
    margin-top: 10px;
    border-radius: 4px;
    text-align: center;
}
</style>`

import NoText from './3NoText.vue'

const noTextContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad } from "xinxin-ui";

export default defineComponent({
    setup() {
        let targetRef = ref<HTMLDivElement>();
        let load = XLoad();

        return {
            targetRef,
            loadOnTarget() {
                load?.show(targetRef.value);
                setTimeout(() => {
                    load?.destroy();
                    targetRef.value!.textContent = "数据请求成功，展示数据";
                }, 3000);
            }
        };
    },
})
<\/script>
<template>
    <x-button type="success" @click="loadOnTarget">在目标处加载</x-button>
    <div class="target" ref="targetRef">
        等待数据展示
    </div>
</template>
<style scoped>
.target {
    width: 100%;
    height: 260px;
    line-height: 260px;
    border: 1px solid #aaa;
    margin-top: 10px;
    border-radius: 4px;
    text-align: center;
}
</style>`

export default defineComponent({
  setup() {
    return {
      TargetLoad,
      targetLoadContent,
      targetLoadInfo: info.targetLoad,

      CloseAndDestory,
      closeAndDestoryContent,
      closeAndDestoryInfo: info.closeAndDestory,

      CustomerText,
      customerTextContent,
      customerTextInfo: info.customerText,

      NoText,
      noTextContent,
      noTextInfo: info.noText,

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
        id="targetLoad"
        :code="targetLoadContent"
        :title="targetLoadInfo.title"
        :code-v-node="TargetLoad"
        :code-desc="targetLoadInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="customerText"
        :code="customerTextContent"
        :title="customerTextInfo.title"
        :code-v-node="CustomerText"
        :code-desc="customerTextInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="closeAndDestory"
        :code="closeAndDestoryContent"
        :title="closeAndDestoryInfo.title"
        :code-v-node="CloseAndDestory"
        :code-desc="closeAndDestoryInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="noText"
        :code="noTextContent"
        :title="noTextInfo.title"
        :code-v-node="NoText"
        :code-desc="noTextInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
