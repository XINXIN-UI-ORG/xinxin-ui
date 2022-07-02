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
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
<\/script>
<template>
    <x-radio v-model="radioValue" value="0">Option 0</x-radio>
    &nbsp;
    <x-radio v-model="radioValue" value="1">Option 1</x-radio>
</template>`

import Desc from './1Desc.vue'

const descContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue,
        };
    },
})
<\/script>
<template>
    <x-radio v-model="radioValue" value="1">
        带描述
        <template #description>
            如果label满足不了你，那加一段描述吧。
        </template>
    </x-radio>
</template>`

import Disabled from './2Disabled.vue'

const disabledContent = `<template>
    <x-radio value="2" disabled>
        禁用
    </x-radio>
</template>`

import Card from './3Card.vue'

const cardContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
<\/script>
<template>
    <x-radio-group v-model="radioValue">
        <x-radio value="0" card>
            《早发白帝城》
            <template #description>
                <p>朝辞白帝彩云间，千里江陵一日还。</p>
                <p>两岸猿声啼不住，轻舟已过万重山。</p>
            </template>
        </x-radio>
        <x-radio value="1" card>
            《黄鹤楼送孟浩然之广陵》
            <template #description>
                <p>故人西辞黄鹤楼，烟花三月下扬州。</p>
                <p>孤帆远影碧空尽，唯见长江天际流。</p>
            </template>
        </x-radio>
    </x-radio-group>
</template>`

import RadioGroup from './4RadioGroup.vue'

const radioGroupContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref<number>(0);
        return {
            radioValue,
        };
    },
})
<\/script>
<template>
    <x-radio-group name="radio group" v-model="radioValue">
        <x-radio :value="0">Group 0</x-radio>
        <x-radio :value="1">Group 1</x-radio>
        <x-radio :value="2">Group 2</x-radio>
    </x-radio-group>
</template>`

import GroupDisabled from './5GroupDisabled.vue'

const groupDisabledContent = `<template>
    <x-radio-group name="radio group disabled" disabled>
        <x-radio :value="0">Group 0</x-radio>
        <x-radio :value="1">Group 1</x-radio>
        <x-radio :value="2">Group 2</x-radio>
    </x-radio-group>
</template>`

import Change from './6Change.vue'

const changeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        let radioValue = ref<number>(0);
        return {
            radioValue,
            changeEvent(value: number) {
                XMessage("change事件触发，当前值为：" + value);
            }
        };
    },
})
<\/script>
<template>
    <x-radio-group name="radio group" v-model="radioValue" @change="changeEvent">
        <x-radio :value="0">Group 0</x-radio>
        <x-radio :value="1">Group 1</x-radio>
        <x-radio :value="2">Group 2</x-radio>
    </x-radio-group>
</template>`

import RadioButton from './7RadioButton.vue'

const radioButtonContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
<\/script>
<template>
    <x-radio-group name="radio button" v-model="radioValue">
        <x-radio-button value="0">
            静夜思
        </x-radio-button>
        <x-radio-button value="1">
            关山月
        </x-radio-button>
        <x-radio-button value="2">
            蜀道难
        </x-radio-button>
    </x-radio-group>
</template>`

import RadioButtonSize from './8RadioButtonSize.vue'

const radioButtonSizeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
<\/script>
<template>
    <x-radio-group name="radio button" v-model="radioValue" size="small">
        <x-radio-button value="0">
            静夜思
        </x-radio-button>
        <x-radio-button value="1">
            关山月
        </x-radio-button>
        <x-radio-button value="2">
            蜀道难
        </x-radio-button>
    </x-radio-group>
    <br><br>
    <x-radio-group name="radio button" v-model="radioValue" size="normal">
        <x-radio-button value="0">
            静夜思
        </x-radio-button>
        <x-radio-button value="1">
            关山月
        </x-radio-button>
        <x-radio-button value="2">
            蜀道难
        </x-radio-button>
    </x-radio-group>
    <br><br>
    <x-radio-group name="radio button" v-model="radioValue" size="large">
        <x-radio-button value="0">
            静夜思
        </x-radio-button>
        <x-radio-button value="1">
            关山月
        </x-radio-button>
        <x-radio-button value="2">
            蜀道难
        </x-radio-button>
    </x-radio-group>
</template>`

import Size from './9Size.vue'

const sizeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
<\/script>
<template>
    <x-radio v-model="radioValue" value="0" size="small">战城南</x-radio>
    &nbsp;
    <x-radio v-model="radioValue" value="1" size="normal">北风行</x-radio>
    &nbsp;
    <x-radio v-model="radioValue" value="2" size="large">襄阳歌</x-radio>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Desc,
      descContent,
      descInfo: info.desc,

      Disabled,
      disabledContent,
      disabledInfo: info.disabled,

      Card,
      cardContent,
      cardInfo: info.card,

      RadioGroup,
      radioGroupContent,
      radioGroupInfo: info.radioGroup,

      GroupDisabled,
      groupDisabledContent,
      groupDisabledInfo: info.groupDisabled,

      Change,
      changeContent,
      changeInfo: info.change,

      RadioButton,
      radioButtonContent,
      radioButtonInfo: info.radioButton,

      RadioButtonSize,
      radioButtonSizeContent,
      radioButtonSizeInfo: info.radioButtonSize,

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

      <CodeExample
        id="disabled"
        :code="disabledContent"
        :title="disabledInfo.title"
        :code-v-node="Disabled"
        :code-desc="disabledInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="radioGroup"
        :code="radioGroupContent"
        :title="radioGroupInfo.title"
        :code-v-node="RadioGroup"
        :code-desc="radioGroupInfo.desc"
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

      <CodeExample
        id="radioButtonSize"
        :code="radioButtonSizeContent"
        :title="radioButtonSizeInfo.title"
        :code-v-node="RadioButtonSize"
        :code-desc="radioButtonSizeInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="desc"
        :code="descContent"
        :title="descInfo.title"
        :code-v-node="Desc"
        :code-desc="descInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="card"
        :code="cardContent"
        :title="cardInfo.title"
        :code-v-node="Card"
        :code-desc="cardInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="groupDisabled"
        :code="groupDisabledContent"
        :title="groupDisabledInfo.title"
        :code-v-node="GroupDisabled"
        :code-desc="groupDisabledInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="radioButton"
        :code="radioButtonContent"
        :title="radioButtonInfo.title"
        :code-v-node="RadioButton"
        :code-desc="radioButtonInfo.desc"
      >
      </CodeExample>

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
