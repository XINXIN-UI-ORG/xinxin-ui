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
            value1: ref([]),
            value2: ref([]),
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
                {
                    label: "听蜀僧浚弹琴-李白",
                    value: "5"
                },
                {
                    label: "金陵酒肆留别-李白",
                    value: "6"
                },
                {
                    label: "子夜四时歌·夏歌-李白",
                    value: "7"
                },
                {
                    label: "子夜四时歌·冬歌-李白",
                    value: "8"
                },
                {
                    label: "赠孟浩然-李白",
                    value: "9"
                },
                {
                    label: "杂诗-李白",
                    value: "10"
                },
                {
                    label: "怨情-李白",
                    value: "11"
                },
                {
                    label: "夜泊牛渚怀古-李白",
                    value: "12"
                },
                {
                    label: "陌上桑-李白",
                    value: "13"
                },
            ],
        };
    },
})
<\/script>
<template>
    <x-select
        :options="options"
        placeholder="未开启过滤"
        v-model="value1"
        multiple
        clearable
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="开启过滤"
        v-model="value2"
        multiple
        filterable
    >
    </x-select>
</template>`

import MultipleCollapse from './6MultipleCollapse.vue'

const multipleCollapseContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value1: ref([]),
            value2: ref([]),
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
                {
                    label: "听蜀僧浚弹琴-李白",
                    value: "5"
                },
                {
                    label: "金陵酒肆留别-李白",
                    value: "6"
                },
                {
                    label: "子夜四时歌·夏歌-李白",
                    value: "7"
                },
                {
                    label: "子夜四时歌·冬歌-李白",
                    value: "8"
                },
                {
                    label: "赠孟浩然-李白",
                    value: "9"
                },
                {
                    label: "杂诗-李白",
                    value: "10"
                },
                {
                    label: "怨情-李白",
                    value: "11"
                },
                {
                    label: "夜泊牛渚怀古-李白",
                    value: "12"
                },
                {
                    label: "陌上桑-李白",
                    value: "13"
                },
            ],
        };
    },
})
<\/script>
<template>
    <x-select
        :options="options"
        placeholder="仅折叠"
        v-model="value1"
        multiple
        collapse-tags
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="鼠标移入折叠处显示具体选项"
        v-model="value2"
        multiple
        collapse-tags
        collapse-tags-tooltip
    >
    </x-select>
</template>`

import Group from './7Group.vue'

const groupContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { SelectTypeEnum } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            value: ref("1"),
            multipleValue: ref([]),
            multipleValueCollapse: ref([]),
            options: [
                {
                    type: SelectTypeEnum.GROUP,
                    label: "李白诗集",
                    value: "libai",
                    children: [
                        {
                            label: "襄阳歌",
                            value: "1",
                        },
                        {
                            label: "采莲曲",
                            value: "2",
                        },
                        {
                            label: "客中行",
                            value: "3",
                        },
                    ],
                },
                {
                    type: SelectTypeEnum.GROUP,
                    label: "韩愈诗集",
                    value: "hanyu",
                    children: [
                        {
                            label: "石鼓歌",
                            value: "4",
                        },
                        {
                            label: "听颖师弹琴",
                            value: "5"
                        },
                        {
                            label: "谒衡岳庙遂宿岳寺题门楼",
                            value: "6"
                        },
                        {
                            label: "八月十五夜赠张功曹",
                            value: "7"
                        },
                        {
                            label: "调张籍",
                            value: "8"
                        },
                    ],
                },
                {
                    type: SelectTypeEnum.GROUP,
                    label: "柳宗元诗集",
                    value: "liuzongyuan",
                    children: [
                        {
                            label: "江雪",
                            value: "9",
                        },
                        {
                            label: "晨诣超师院读禅经",
                            value: "10"
                        },
                        {
                            label: "登柳州城楼寄漳汀封连四州",
                            value: "11"
                        },
                        {
                            label: "溪居",
                            value: "12"
                        },
                        {
                            label: "饮酒",
                            value: "13"
                        },
                    ],
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
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="multipleValue"
        multiple
        filterable
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="multipleValueCollapse"
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
    >
    </x-select>
</template>`

import Event from './8Event.vue'

const eventContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            value: ref("1"),
            multipleValue: ref([]),
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
            focus(value: string) {
                XMessage("focus事件触发!" + value);
            },
            blur(value: string) {
                XMessage("blur事件触发!" + value);
            },
        };
    },
})
<\/script>
<template>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="value"
        @focus="focus"
        @blur="blur"
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="multipleValue"
        multiple
        @focus="focus"
        @blur="blur"
    >
    </x-select>
</template>`

import Status from './91Status.vue'

const statusContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref("0"),
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
        placeholder="错误状态"
        v-model="value"
        status="error"
    >
    </x-select>
</template>`

import VirtualSelect from './9VirtualSelect.vue'

const virtualSelectContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let options = [] as any;
        for (let i = 0; i < 1000; i++) {
            options.push({
                label: "襄阳歌-李白" + i,
                value: i,
            });
        }
        return {
            value: ref("1"),
            options,
        };
    },
});
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

      MultipleCollapse,
      multipleCollapseContent,
      multipleCollapseInfo: info.multipleCollapse,

      Group,
      groupContent,
      groupInfo: info.group,

      Event,
      eventContent,
      eventInfo: info.event,

      Status,
      statusContent,
      statusInfo: info.status,

      VirtualSelect,
      virtualSelectContent,
      virtualSelectInfo: info.virtualSelect,

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

      <CodeExample
        id="multipleCollapse"
        :code="multipleCollapseContent"
        :title="multipleCollapseInfo.title"
        :code-v-node="MultipleCollapse"
        :code-desc="multipleCollapseInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="event"
        :code="eventContent"
        :title="eventInfo.title"
        :code-v-node="Event"
        :code-desc="eventInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="virtualSelect"
        :code="virtualSelectContent"
        :title="virtualSelectInfo.title"
        :code-v-node="VirtualSelect"
        :code-desc="virtualSelectInfo.desc"
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

      <CodeExample
        id="group"
        :code="groupContent"
        :title="groupInfo.title"
        :code-v-node="Group"
        :code-desc="groupInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="status"
        :code="statusContent"
        :title="statusInfo.title"
        :code-v-node="Status"
        :code-desc="statusInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
