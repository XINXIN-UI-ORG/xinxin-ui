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

import Description from './3Description.vue'

const descriptionContent = `<script lang="ts">
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
    <x-checkbox v-model:checked="checkboxValue">
        菩萨蛮·举头忽见衡阳雁
        <template #description>
            <p>举头忽见衡阳雁。千声万字情何限。</p>
            <p>叵耐薄情夫。一行书也无。</p>
            <p>泣归香阁恨。和泪掩红粉。</p>
            <p>待雁却回时。也无书寄伊。</p>
        </template>
    </x-checkbox>
</template>`

import CheckboxGroup from './4CheckboxGroup.vue'

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

import Card from './5Card.vue'

const cardContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let groupList = ref(['2']);
        return {
            groupList
        };
    },
})
<\/script>
<template>
    <x-checkbox-group v-model="groupList">
        <x-checkbox card value="0">
            望天门山
            <template #description>
                <p>天门中断楚江开，碧水东流至此回。</p>
                <p>两岸青山相对出，孤帆一片日边来。</p>
            </template>
        </x-checkbox>
        <x-checkbox card value="1">
            峨眉山月歌
            <template #description>
                <p>峨眉山月半轮秋，影入平羌江水流。</p>
                <p>夜发清溪向三峡，思君不见下渝州。</p>
            </template>
        </x-checkbox>
        <x-checkbox card disabled value="2">
            送友人
            <template #description>
                <p>青山横北郭，白水绕东城。</p>
                <p>此地一为别，孤蓬万里征。</p>
                <p>浮云游子意，落日故人情。</p>
                <p>挥手自兹去，萧萧班马鸣。</p>
            </template>
        </x-checkbox>
    </x-checkbox-group>
</template>`

import GroupDisabled from './6GroupDisabled.vue'

const groupDisabledContent = `<script lang="ts">
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
    <x-checkbox-group v-model="groupValue" name="按钮组禁用" disabled>
        <x-checkbox value="0">独坐敬亭山</x-checkbox>
        <x-checkbox value="1">望天门山</x-checkbox>
        <x-checkbox value="2">侠客行</x-checkbox>
    </x-checkbox-group>
</template>`

import Change from './7Change.vue'

const changeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        let groupValue = ref([]);
        return {
            groupValue,
            change(change: string[]) {
                XMessage("[" + change + "]");
            }
        };
    },
})
<\/script>
<template>
    <x-checkbox-group v-model="groupValue" name="按钮组禁用" @change="change">
        <x-checkbox value="独坐敬亭山">独坐敬亭山</x-checkbox>
        <x-checkbox value="望天门山">望天门山</x-checkbox>
        <x-checkbox value="侠客行">侠客行</x-checkbox>
    </x-checkbox-group>
</template>
`

import CheckboxButton from './8CheckboxButton.vue'

const checkboxButtonContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            checkboxValue: ref([]),
        };
    },
})
<\/script>
<template>
    <x-checkbox-group v-model="checkboxValue" size="large">
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
    </x-checkbox-group>
    <br><br>
    <x-checkbox-group v-model="checkboxValue" size="normal">
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
    </x-checkbox-group>
    <br><br>
    <x-checkbox-group v-model="checkboxValue" size="small">
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
    </x-checkbox-group>
    <br><br>
    <x-checkbox-group v-model="checkboxValue" disabled>
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
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

      Description,
      descriptionContent,
      descriptionInfo: info.description,

      CheckboxGroup,
      checkboxGroupContent,
      checkboxGroupInfo: info.checkboxGroup,

      Card,
      cardContent,
      cardInfo: info.card,

      GroupDisabled,
      groupDisabledContent,
      groupDisabledInfo: info.groupDisabled,

      Change,
      changeContent,
      changeInfo: info.change,

      CheckboxButton,
      checkboxButtonContent,
      checkboxButtonInfo: info.checkboxButton,

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

      <CodeExample
        id="checkboxGroup"
        :code="checkboxGroupContent"
        :title="checkboxGroupInfo.title"
        :code-v-node="CheckboxGroup"
        :code-desc="checkboxGroupInfo.desc"
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
        id="checkboxButton"
        :code="checkboxButtonContent"
        :title="checkboxButtonInfo.title"
        :code-v-node="CheckboxButton"
        :code-desc="checkboxButtonInfo.desc"
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
        id="description"
        :code="descriptionContent"
        :title="descriptionInfo.title"
        :code-v-node="Description"
        :code-desc="descriptionInfo.desc"
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
        id="change"
        :code="changeContent"
        :title="changeInfo.title"
        :code-v-node="Change"
        :code-desc="changeInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
