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
            inputValue,
        };
    },
})
<\/script>
<template>
    <x-input placeholder="请输入" v-model="inputValue" block />
</template>`

import Mode from './1Mode.vue'

const modeContent = `<template>
<x-input placeholder="小" type="text" mode="small" block />
<x-input placeholder="中" type="text" mode="normal" block />
<x-input placeholder="大" type="text" mode="large" block />
</template>`

import Size from './2Size.vue'

const sizeContent = `<template>
    <x-input placeholder="30" type="text" size="30" />
    <br>
    <x-input placeholder="40" type="text" size="40" />
    <br>
    <x-input placeholder="50" type="text" size="50" />
</template>`

import Disabled from './3Disabled.vue'

const disabledContent = `<template>
    <x-input
        placeholder="请输入"
        type="text"
        :disabled="true"
        block
    />
</template>`

import Fix from './4Fix.vue'

const fixContent = `<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
    },
    components: {
        Search
    },
})
<\/script>
<template>
    <x-input placeholder="请输入" type="text" block>
        <template #prefix>Prefix</template>
    </x-input>
    <x-input placeholder="请输入" type="text" block>
        <template #suffix>Suffix</template>
    </x-input>
    <x-input placeholder="请输入" block>
        <template #prefix>
            <Search />
        </template>
    </x-input>
    <x-input placeholder="请输入" block>
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>`

import Clear from './5Clear.vue'

const clearContent = `<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
    },
    components: {
        Search
    },
})
<\/script>
<template>
    <x-input placeholder="请输入" block clearable />
    <x-input placeholder="请输入" block clearable>
        <template #suffix>Suffix</template>
    </x-input>
    <x-input placeholder="请输入" block clearable>
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>`

import Password from './6Password.vue'

const passwordContent = `<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
    },
    components: {
        Search
    },
})
<\/script>
<template>
    <x-input placeholder="点击触发显示密码" type="password" show-password-on="click" block />
    <x-input placeholder="鼠标按下触发显示密码" type="password" show-password-on="mousedown" block>
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>`

import Status from './7Status.vue'

const statusContent = `<template>
    <x-input placeholder="错误状态" status="error" />
</template>`

import Block from './8Block.vue'

const blockContent = `<template>
    <x-input placeholder="块级输入" block />
</template>`

import FocusAndBlur from './91FocusAndBlur.vue'

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
    <x-input placeholder="触发focus&blur" @onInputBlur="inputBlur" @onInputFocus="inputFocus" block />
</template>`

import InputEvent from './9InputEvent.vue'

const inputEventContent = `<script lang="ts">
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
    <x-input placeholder="onInput事件" @onInputChange="inputChange" block />
    <div class="show" ref="showRef"></div>
</template>
<style scoped>
.show {
    margin: 10px 0 0 10px;
}
</style>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Mode,
      modeContent,
      modeInfo: info.mode,

      Size,
      sizeContent,
      sizeInfo: info.size,

      Disabled,
      disabledContent,
      disabledInfo: info.disabled,

      Fix,
      fixContent,
      fixInfo: info.fix,

      Clear,
      clearContent,
      clearInfo: info.clear,

      Password,
      passwordContent,
      passwordInfo: info.password,

      Status,
      statusContent,
      statusInfo: info.status,

      Block,
      blockContent,
      blockInfo: info.block,

      FocusAndBlur,
      focusAndBlurContent,
      focusAndBlurInfo: info.focusAndBlur,

      InputEvent,
      inputEventContent,
      inputEventInfo: info.inputEvent,

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
        id="size"
        :code="sizeContent"
        :title="sizeInfo.title"
        :code-v-node="Size"
        :code-desc="sizeInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="fix"
        :code="fixContent"
        :title="fixInfo.title"
        :code-v-node="Fix"
        :code-desc="fixInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="password"
        :code="passwordContent"
        :title="passwordInfo.title"
        :code-v-node="Password"
        :code-desc="passwordInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="block"
        :code="blockContent"
        :title="blockInfo.title"
        :code-v-node="Block"
        :code-desc="blockInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="inputEvent"
        :code="inputEventContent"
        :title="inputEventInfo.title"
        :code-v-node="InputEvent"
        :code-desc="inputEventInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="mode"
        :code="modeContent"
        :title="modeInfo.title"
        :code-v-node="Mode"
        :code-desc="modeInfo.desc"
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
        id="clear"
        :code="clearContent"
        :title="clearInfo.title"
        :code-v-node="Clear"
        :code-desc="clearInfo.desc"
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

      <CodeExample
        id="focusAndBlur"
        :code="focusAndBlurContent"
        :title="focusAndBlurInfo.title"
        :code-v-node="FocusAndBlur"
        :code-desc="focusAndBlurInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
