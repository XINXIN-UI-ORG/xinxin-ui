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
        let checkboxValue = ref(false);
        return {
            checkboxValue,
        };
    },
})
<\/script>
<template>
    <x-checkbox v-model:checked="checkboxValue" label="复选框"></x-checkbox>
    &nbsp;
    <x-checkbox v-model:checked="checkboxValue">复选框在slot</x-checkbox>
</template>`

import Disabled from './1Disabled.vue'

const disabledContent = `<template>
    <x-checkbox disabled>禁用复选框</x-checkbox>
</template>`

import Indeterminate from './2Indeterminate.vue'

const indeterminateContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let checkValue = ref<boolean>(false);
        let indeterminateValue = ref<boolean>(false);
        return {
            checkValue,
            indeterminateValue,
            selectCheckBox() {
                checkValue.value = !checkValue.value;
            },
            indeterminateCheckbox() {
                indeterminateValue.value = !indeterminateValue.value;
            }
        };
    },
})
<\/script>
<template>
    <div class="show">
        <x-checkbox
            v-model:checked="checkValue"
            :indeterminate="indeterminateValue"
        />
        &nbsp;&nbsp;
        <x-button
            size="small"
            ghost
            type="warning"
            @click="selectCheckBox"
        >
            选中
        </x-button>
        <x-button
            size="small"
            ghost
            type="warning"
            @click="indeterminateCheckbox"
        >
            部分选中
        </x-button>
    </div>
</template>
<style scoped>
.show {
    display: flex;
    align-items: center;
}
.show :deep(.x-button) {
    margin-top: 0;
}
</style>`

import CheckboxGroup from './3CheckboxGroup.vue'

const checkboxGroupContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let groupValue = ref(['0', '1']);
        return {
            groupValue,
        };
    },
})
<\/script>
<template>
    <x-checkbox-group v-model="groupValue">
        <x-checkbox value="0">独坐敬亭山</x-checkbox>
        <x-checkbox value="1">望天门山</x-checkbox>
        <x-checkbox value="2">侠客行</x-checkbox>
    </x-checkbox-group>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Disabled,
      disabledContent,
      disabledInfo: info.disabled,

      Indeterminate,
      indeterminateContent,
      indeterminateInfo: info.indeterminate,

      CheckboxGroup,
      checkboxGroupContent,
      checkboxGroupInfo: info.checkboxGroup,

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
        id="indeterminate"
        :code="indeterminateContent"
        :title="indeterminateInfo.title"
        :code-v-node="Indeterminate"
        :code-desc="indeterminateInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="disabled"
        :code="disabledContent"
        :title="disabledInfo.title"
        :code-v-node="Disabled"
        :code-desc="disabledInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="checkboxGroup"
        :code="checkboxGroupContent"
        :title="checkboxGroupInfo.title"
        :code-v-node="CheckboxGroup"
        :code-desc="checkboxGroupInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
