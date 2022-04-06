<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<template>
    <x-button>Default</x-button>
    <x-button type="info">Info</x-button>
    <x-button type="success">Success</x-button>
    <x-button type="warning">Warning</x-button>
    <x-button type="error">Error</x-button>
</template>`

import Second from './1Second.vue'

const secondContent = `<template>
    <x-button secondary>Default</x-button>
    <x-button secondary type="info">Info</x-button>
    <x-button secondary type="success">Success</x-button>
    <x-button secondary type="warning">Warning</x-button>
    <x-button secondary type="error">Error</x-button>

    <x-button secondary round>Default</x-button>
    <x-button secondary round type="info">Info</x-button>
    <x-button secondary round type="success">Success</x-button>
    <x-button secondary round type="warning">Warning</x-button>
    <x-button secondary round type="error">Error</x-button>

    <x-button secondary circle>D</x-button>
    <x-button secondary circle type="info">I</x-button>
    <x-button secondary circle type="success">S</x-button>
    <x-button secondary circle type="warning">W</x-button>
    <x-button secondary circle type="error">E</x-button>
</template>`

import Third from './2Third.vue'

const thirdContent = `<template>
    <x-button tertiary>Default</x-button>
    <x-button tertiary type="info">Info</x-button>
    <x-button tertiary type="success">Success</x-button>
    <x-button tertiary type="warning">Warning</x-button>
    <x-button tertiary type="error">Error</x-button>

    <x-button tertiary round>Default</x-button>
    <x-button tertiary round type="info">Info</x-button>
    <x-button tertiary round type="success">Success</x-button>
    <x-button tertiary round type="warning">Warning</x-button>
    <x-button tertiary round type="error">Error</x-button>

    <x-button tertiary circle>D</x-button>
    <x-button tertiary circle type="info">I</x-button>
    <x-button tertiary circle type="success">S</x-button>
    <x-button tertiary circle type="warning">W</x-button>
    <x-button tertiary circle type="error">E</x-button>
</template>`

import Fourth from './3Fourth.vue'

const fourthContent = `<template>
    <x-button quaternary>Default</x-button>
    <x-button quaternary type="info">Info</x-button>
    <x-button quaternary type="success">Success</x-button>
    <x-button quaternary type="warning">Warning</x-button>
    <x-button quaternary type="error">Error</x-button>

    <x-button quaternary round>Default</x-button>
    <x-button quaternary round type="info">Info</x-button>
    <x-button quaternary round type="success">Success</x-button>
    <x-button quaternary round type="warning">Warning</x-button>
    <x-button quaternary round type="error">Error</x-button>

    <x-button quaternary circle>D</x-button>
    <x-button quaternary circle type="info">I</x-button>
    <x-button quaternary circle type="success">S</x-button>
    <x-button quaternary circle type="warning">W</x-button>
    <x-button quaternary circle type="error">E</x-button>
</template>`

import dotted from './4dotted.vue'

const dottedContent = `<template>
    <x-button dashed>Default</x-button>
    <x-button dashed type="info">Info</x-button>
    <x-button dashed type="success">Success</x-button>
    <x-button dashed type="warning">Warning</x-button>
    <x-button dashed type="error">Error</x-button>
</template>`

import plain from './5plain.vue'

const plainContent = `<template>
    <x-button plain>Default</x-button>
    <x-button plain type="info">Info</x-button>
    <x-button plain type="success">Success</x-button>
    <x-button plain type="warning">Warning</x-button>
    <x-button plain type="error">Error</x-button>
</template>`

import round from './6round.vue'

const roundContent = `<template>
    <x-button round>Default</x-button>
    <x-button round type="info">Info</x-button>
    <x-button round type="success">Success</x-button>
    <x-button round type="warning">Warning</x-button>
    <x-button round type="error">Error</x-button>
</template>`

import circle from './7circle.vue'

const circleContent = `<template>
    <x-button circle>D</x-button>
    <x-button circle type="info">I</x-button>
    <x-button circle type="success">S</x-button>
    <x-button circle type="warning">W</x-button>
    <x-button circle type="error">E</x-button>
</template>`

import ghost from './8ghost.vue'

const ghostContent = `<template>
    <x-button ghost>Default</x-button>
    <x-button ghost type="info">Info</x-button>
    <x-button ghost type="success">Success</x-button>
    <x-button ghost type="warning">Warning</x-button>
    <x-button ghost type="error">Error</x-button>
</template>`

import size from './90size.vue'

const sizeContent = `<template>
    <x-button type="error" size="mini">Error</x-button>
    <x-button type="info" size="small">Info</x-button>
    <x-button type="success" size="normal">Success</x-button>
    <x-button type="warning" size="large">Warning</x-button>
    <x-button type="warning" size="large" circle>Warning</x-button>
</template>`

import disabled from './91disabled.vue'

const disabledContent = `<template>
    <x-button type="info" disabled>Info</x-button>
    <x-button type="success" :disabled="true">Success</x-button>
    <x-button type="warning" :disabled="true">Warning</x-button>
    <x-button type="error" :disabled="true">Error</x-button>
</template>`

import loading from './92loading.vue'

const loadingContent = `<template>
    <x-button type="info" loading>Info</x-button>
    <x-button type="success" :loading="true">Success</x-button>
    <x-button type="warning" :loading="true">Warning</x-button>
    <x-button type="error" :loading="true">Error</x-button>
</template>`

import customer from './93customer.vue'

const customerContent = `<template>
    <x-button color="#626aef">Info</x-button>
    <x-button color="#ff69b4" secondary>Success</x-button>
    <x-button color="#8a2be2" tertiary>Warning</x-button>
    <x-button color="#626aef" quaternary>Error</x-button>
    <x-button color="#ff69b4" dashed>Error</x-button>
    <x-button color="#626aef" plain>Error</x-button>
    <x-button color="#ff69b4" ghost>Error</x-button>
    <x-button color="#626aef" ghost round>Error</x-button>
</template>`

import block from './94block.vue'

const blockContent = `<template>
    <x-button type="info" block>Info</x-button> <br>
    <x-button type="success" block>Success</x-button> <br>
    <x-button type="warning" block>Warning</x-button> <br>
    <x-button type="error" block>Error</x-button>
</template>`

import buttonGroup from './95buttonGroup.vue'

const buttonGroupContent = `<template>
    <x-button-group>
        <x-button ghost />
        <x-button ghost />
        <x-button ghost />
    </x-button-group>

    <x-button-group direction="vertical">
        <x-button ghost />
        <x-button ghost />
        <x-button ghost />
    </x-button-group>
</template>`

import icons from './9icons.vue'

const iconsContent = `<script lang="ts">
import { defineComponent } from "vue";
import { AuthSuccess, Search, Auth, Top, Refresh } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        
    },
    components: {
        AuthSuccess,
        Search,
        Auth,
        Top,
        Refresh
    }
})
<\/script>
<template>
    <x-button>
        <template #pre-icon>
            <AuthSuccess />
        </template>
        Default
    </x-button>
    <x-button type="info">
        <template #pre-icon>
            <Search />
        </template>
        Info
    </x-button>
    <x-button type="success">
        <template #suf-icon>
            <Auth />
        </template>
        Success
    </x-button>
    <x-button type="warning">
        <template #pre-icon>
            <Top />
        </template>
        Warning
    </x-button>
    <x-button type="error">
        <template #pre-icon>
            <Refresh />
        </template>
        Error
    </x-button>

    <x-button circle>
        <AuthSuccess />
    </x-button>
    <x-button type="info" circle>
        <Search />
    </x-button>
    <x-button type="success" circle>
        <Auth />
    </x-button>
    <x-button type="warning" circle>
        <Top />
    </x-button>
    <x-button type="error" circle>
        <Refresh />
    </x-button>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Second,
      secondContent,
      secondInfo: info.second,

      Third,
      thirdContent,
      thirdInfo: info.third,

      Fourth,
      fourthContent,
      fourthInfo: info.fourth,

      dotted,
      dottedContent,
      dottedInfo: info.dotted,

      plain,
      plainContent,
      plainInfo: info.plain,

      round,
      roundContent,
      roundInfo: info.round,

      circle,
      circleContent,
      circleInfo: info.circle,

      ghost,
      ghostContent,
      ghostInfo: info.ghost,

      size,
      sizeContent,
      sizeInfo: info.size,

      disabled,
      disabledContent,
      disabledInfo: info.disabled,

      loading,
      loadingContent,
      loadingInfo: info.loading,

      customer,
      customerContent,
      customerInfo: info.customer,

      block,
      blockContent,
      blockInfo: info.block,

      buttonGroup,
      buttonGroupContent,
      buttonGroupInfo: info.buttonGroup,

      icons,
      iconsContent,
      iconsInfo: info.icons,

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
        id="third"
        :code="thirdContent"
        :title="thirdInfo.title"
        :code-v-node="Third"
        :code-desc="thirdInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="dotted"
        :code="dottedContent"
        :title="dottedInfo.title"
        :code-v-node="dotted"
        :code-desc="dottedInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="round"
        :code="roundContent"
        :title="roundInfo.title"
        :code-v-node="round"
        :code-desc="roundInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="ghost"
        :code="ghostContent"
        :title="ghostInfo.title"
        :code-v-node="ghost"
        :code-desc="ghostInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="disabled"
        :code="disabledContent"
        :title="disabledInfo.title"
        :code-v-node="disabled"
        :code-desc="disabledInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="customer"
        :code="customerContent"
        :title="customerInfo.title"
        :code-v-node="customer"
        :code-desc="customerInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="buttonGroup"
        :code="buttonGroupContent"
        :title="buttonGroupInfo.title"
        :code-v-node="buttonGroup"
        :code-desc="buttonGroupInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="second"
        :code="secondContent"
        :title="secondInfo.title"
        :code-v-node="Second"
        :code-desc="secondInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="fourth"
        :code="fourthContent"
        :title="fourthInfo.title"
        :code-v-node="Fourth"
        :code-desc="fourthInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="plain"
        :code="plainContent"
        :title="plainInfo.title"
        :code-v-node="plain"
        :code-desc="plainInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="circle"
        :code="circleContent"
        :title="circleInfo.title"
        :code-v-node="circle"
        :code-desc="circleInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="size"
        :code="sizeContent"
        :title="sizeInfo.title"
        :code-v-node="size"
        :code-desc="sizeInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="loading"
        :code="loadingContent"
        :title="loadingInfo.title"
        :code-v-node="loading"
        :code-desc="loadingInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="block"
        :code="blockContent"
        :title="blockInfo.title"
        :code-v-node="block"
        :code-desc="blockInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="icons"
        :code="iconsContent"
        :title="iconsInfo.title"
        :code-v-node="icons"
        :code-desc="iconsInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
