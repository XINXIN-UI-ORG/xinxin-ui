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
        let inputValue = ref("");
        return {
            inputValue
        };
    },
})
<\/script>
<template>
    <x-number-input placeholder="基础使用" block v-model="inputValue" />
</template>`

import PlusAndMinus from './1PlusAndMinus.vue'

const plusAndMinusContent = `<template>
    <x-number-input
        placeholder="带加减按钮"
        number-button
        clearable
        block
    />
</template>`

import Step from './2Step.vue'

const stepContent = `<template>
    <x-number-input
        placeholder="数字输入"
        number-button
        clearable
        step="2"
        block
    />
    <x-number-input
        placeholder="数字输入"
        number-button
        clearable
        :step="3"
        block
    />
</template>`

import Limit from './3Limit.vue'

const limitContent = `<template>
    <x-number-input
        placeholder="最大限制6"
        number-button
        clearable
        :max="6"
        block
    />
    <x-number-input
        placeholder="最小限制1"
        number-button
        clearable
        :min="1"
        block
    />
    <x-number-input
        placeholder="最大6最小1"
        number-button
        clearable
        :max="6"
        :min="1"
        block
    />
</template>`

import Disabled from './4Disabled.vue'

const disabledContent = `<template>
    <x-number-input
        placeholder="禁用输入"
        number-button
        disabled
        block
    />
</template>`

import OnInput from './5OnInput.vue'

const onInputContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let showRef = ref<HTMLDivElement>();
        return {
            showRef,
            inputChange(value: string) {
                showRef.value!.textContent = value;
            },
        };
    },
})
<\/script>
<template>
    <x-number-input
        placeholder="数字输入"
        number-button
        clearable
        block
        @onInputChange="inputChange"
    />
    <div class="show" ref="showRef"></div>
</template>
<style scoped>
.show {
    margin: 10px 0 0 10px;
}
</style>`

import FocusAndBlur from './6FocusAndBlur.vue'

const focusAndBlurContent = `<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            inputBlur(value: string) {
                XMessage("blur触发，input框的内容为：" + value);
            },
            inputFocus(value: string) {
                XMessage("focus触发，input框的内容为：" + value);
            },
        };
    },
})
<\/script>
<template>
    <x-number-input
        placeholder="触发focus&blur"
        number-button
        clearable
        block
        @onInputBlur="inputBlur"
        @onInputFocus="inputFocus"
    />
</template>`

import Status from './7Status.vue'

const statusContent = `<template>
    <x-number-input
        placeholder="输入框状态"
        number-button
        clearable
        block
        status="error"
    />
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      PlusAndMinus,
      plusAndMinusContent,
      plusAndMinusInfo: info.plusAndMinus,

      Step,
      stepContent,
      stepInfo: info.step,

      Limit,
      limitContent,
      limitInfo: info.limit,

      Disabled,
      disabledContent,
      disabledInfo: info.disabled,

      OnInput,
      onInputContent,
      onInputInfo: info.onInput,

      FocusAndBlur,
      focusAndBlurContent,
      focusAndBlurInfo: info.focusAndBlur,

      Status,
      statusContent,
      statusInfo: info.status,

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
        id="step"
        :code="stepContent"
        :title="stepInfo.title"
        :code-v-node="Step"
        :code-desc="stepInfo.desc"
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
        id="focusAndBlur"
        :code="focusAndBlurContent"
        :title="focusAndBlurInfo.title"
        :code-v-node="FocusAndBlur"
        :code-desc="focusAndBlurInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="plusAndMinus"
        :code="plusAndMinusContent"
        :title="plusAndMinusInfo.title"
        :code-v-node="PlusAndMinus"
        :code-desc="plusAndMinusInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="limit"
        :code="limitContent"
        :title="limitInfo.title"
        :code-v-node="Limit"
        :code-desc="limitInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="onInput"
        :code="onInputContent"
        :title="onInputInfo.title"
        :code-v-node="OnInput"
        :code-desc="onInputInfo.desc"
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
