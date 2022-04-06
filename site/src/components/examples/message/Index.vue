<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            InfoMessage() {
                XMessage({
                    message: "info类型消息提示",
                    type: "info"
                });
            },
            SuccessMessage() {
                XMessage({
                    message: "success类型消息提示",
                    type: "success"
                });
            },
            WarningMessage() {
                XMessage({
                    message: "warning类型消息提示",
                    type: "warning"
                });
            },
            ErrorMessage() {
                XMessage({
                    message: "error类型消息提示",
                    type: "error"
                });
            },
        };
    },
})
<\/script>
<template>
    <x-button @click="InfoMessage" type="info">Info消息提示</x-button>
    <x-button @click="SuccessMessage" type="success">Success消息提示</x-button>
    <x-button @click="WarningMessage" type="warning">Warning消息提示</x-button>
    <x-button @click="ErrorMessage" type="error">Error消息提示</x-button>
</template>`

import Duration from './1Duration.vue'

const durationContent = `<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            defaultClose() {
                XMessage("默认时间关闭");
            },
            oneSecondClose() {
                XMessage({
                    message: "消息1s后关闭",
                    duration: 1000
                });
            },
            fiveSecondClose() {
                XMessage({
                    message: "消息5s后关闭",
                    duration: 5000
                });
            },
            tenSecondClose() {
                XMessage({
                    message: "消息10s后关闭",
                    duration: 10000
                });
            },
        };
    },
})
<\/script>
<template>
    <x-button @click="defaultClose">默认时间关闭</x-button>
    <x-button @click="oneSecondClose">1s后关闭</x-button>
    <x-button @click="fiveSecondClose">5s关闭</x-button>
    <x-button @click="tenSecondClose">10s关闭</x-button>
</template>`

import Close from './2Close.vue'

const closeContent = `><script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            closeable() {
                XMessage({
                    message: "显示关闭按钮",
                    duration: 10000,
                    closable: true
                });
            }
        };
    },
})
<\/script>
<template>
    <x-button @click="closeable">显示关闭按钮</x-button>
</template>`

import CloseEvent from './3CloseEvent.vue'

const closeEventContent = `<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            closeCallback() {
                XMessage({
                    message: "消息关闭回调",
                    onClose() {
                        XMessage({
                            message: "消息被销毁",
                            type: "warning"
                        });
                    }
                });
            }
        };
    },
})
<\/script>
<template>
    <x-button @click="closeCallback">关闭回调</x-button>
</template>`

import Icon from './4Icon.vue'

const iconContent = `<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";
import { Rocket } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        return {
            messageIcon() {
                XMessage({
                    message: "自定义消息图标",
                    type: "error",
                    icon: Rocket, 
                });
            },
        };
    },
    components: {
        Rocket
    },
})
<\/script>
<template>
    <x-button @click="messageIcon" type="error">
        <template #pre-icon>
            <Rocket />
        </template>
        设置消息图标
    </x-button>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Duration,
      durationContent,
      durationInfo: info.duration,

      Close,
      closeContent,
      closeInfo: info.close,

      CloseEvent,
      closeEventContent,
      closeEventInfo: info.closeEvent,

      Icon,
      iconContent,
      iconInfo: info.icon,

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
        id="close"
        :code="closeContent"
        :title="closeInfo.title"
        :code-v-node="Close"
        :code-desc="closeInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="icon"
        :code="iconContent"
        :title="iconInfo.title"
        :code-v-node="Icon"
        :code-desc="iconInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="duration"
        :code="durationContent"
        :title="durationInfo.title"
        :code-v-node="Duration"
        :code-desc="durationInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="closeEvent"
        :code="closeEventContent"
        :title="closeEventInfo.title"
        :code-v-node="CloseEvent"
        :code-desc="closeEventInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
