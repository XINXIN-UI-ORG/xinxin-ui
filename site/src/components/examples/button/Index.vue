<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

import Second from './1Second.vue'

import Third from './2Third.vue'

import Fourth from './3Fourth.vue'

import dotted from './4dotted.vue'

import plain from './5plain.vue'

import round from './6round.vue'

import circle from './7circle.vue'

import ghost from './8ghost.vue'

import size from './90size.vue'

import disabled from './91disabled.vue'

import loading from './92loading.vue'

import customer from './93customer.vue'

import block from './94block.vue'

import buttonGroup from './95buttonGroup.vue'

import icons from './9icons.vue'

export default defineComponent({
  setup() {
    return {
      Base,
      baseInfo: info.base,

      Second,
      secondInfo: info.second,

      Third,
      thirdInfo: info.third,

      Fourth,
      fourthInfo: info.fourth,

      dotted,
      dottedInfo: info.dotted,

      plain,
      plainInfo: info.plain,

      round,
      roundInfo: info.round,

      circle,
      circleInfo: info.circle,

      ghost,
      ghostInfo: info.ghost,

      size,
      sizeInfo: info.size,

      disabled,
      disabledInfo: info.disabled,

      loading,
      loadingInfo: info.loading,

      customer,
      customerInfo: info.customer,

      block,
      blockInfo: info.block,

      buttonGroup,
      buttonGroupInfo: info.buttonGroup,

      icons,
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
        code='<template>
    <x-button>Default</x-button>
    <x-button type="info">Info</x-button>
    <x-button type="success">Success</x-button>
    <x-button type="warning">Warning</x-button>
    <x-button type="error">Error</x-button>
</template>'
        :title="baseInfo.title"
        :code-v-node="Base"
        :code-desc="baseInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="third"
        code='<template>
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
</template>'
        :title="thirdInfo.title"
        :code-v-node="Third"
        :code-desc="thirdInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="dotted"
        code='<template>
    <x-button dashed>Default</x-button>
    <x-button dashed type="info">Info</x-button>
    <x-button dashed type="success">Success</x-button>
    <x-button dashed type="warning">Warning</x-button>
    <x-button dashed type="error">Error</x-button>
</template>'
        :title="dottedInfo.title"
        :code-v-node="dotted"
        :code-desc="dottedInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="round"
        code='<template>
    <x-button round>Default</x-button>
    <x-button round type="info">Info</x-button>
    <x-button round type="success">Success</x-button>
    <x-button round type="warning">Warning</x-button>
    <x-button round type="error">Error</x-button>
</template>'
        :title="roundInfo.title"
        :code-v-node="round"
        :code-desc="roundInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="ghost"
        code='<template>
    <x-button ghost>Default</x-button>
    <x-button ghost type="info">Info</x-button>
    <x-button ghost type="success">Success</x-button>
    <x-button ghost type="warning">Warning</x-button>
    <x-button ghost type="error">Error</x-button>
</template>'
        :title="ghostInfo.title"
        :code-v-node="ghost"
        :code-desc="ghostInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="disabled"
        code='<template>
    <x-button type="info" disabled>Info</x-button>
    <x-button type="success" :disabled="true">Success</x-button>
    <x-button type="warning" :disabled="true">Warning</x-button>
    <x-button type="error" :disabled="true">Error</x-button>
</template>'
        :title="disabledInfo.title"
        :code-v-node="disabled"
        :code-desc="disabledInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="customer"
        code='<template>
    <x-button color="#626aef">Info</x-button>
    <x-button color="#ff69b4" secondary>Success</x-button>
    <x-button color="#8a2be2" tertiary>Warning</x-button>
    <x-button color="#626aef" quaternary>Error</x-button>
    <x-button color="#ff69b4" dashed>Error</x-button>
    <x-button color="#626aef" plain>Error</x-button>
    <x-button color="#ff69b4" ghost>Error</x-button>
    <x-button color="#626aef" ghost round>Error</x-button>
</template>'
        :title="customerInfo.title"
        :code-v-node="customer"
        :code-desc="customerInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="buttonGroup"
        code='<template>
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
</template>'
        :title="buttonGroupInfo.title"
        :code-v-node="buttonGroup"
        :code-desc="buttonGroupInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="second"
        code='<template>
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
</template>'
        :title="secondInfo.title"
        :code-v-node="Second"
        :code-desc="secondInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="fourth"
        code='<template>
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
</template>'
        :title="fourthInfo.title"
        :code-v-node="Fourth"
        :code-desc="fourthInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="plain"
        code='<template>
    <x-button plain>Default</x-button>
    <x-button plain type="info">Info</x-button>
    <x-button plain type="success">Success</x-button>
    <x-button plain type="warning">Warning</x-button>
    <x-button plain type="error">Error</x-button>
</template>'
        :title="plainInfo.title"
        :code-v-node="plain"
        :code-desc="plainInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="circle"
        code='<template>
    <x-button circle>D</x-button>
    <x-button circle type="info">I</x-button>
    <x-button circle type="success">S</x-button>
    <x-button circle type="warning">W</x-button>
    <x-button circle type="error">E</x-button>
</template>'
        :title="circleInfo.title"
        :code-v-node="circle"
        :code-desc="circleInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="size"
        code='<template>
    <x-button type="error" size="mini">Error</x-button>
    <x-button type="info" size="small">Info</x-button>
    <x-button type="success" size="normal">Success</x-button>
    <x-button type="warning" size="large">Warning</x-button>
    <x-button type="warning" size="large" circle>Warning</x-button>
</template>'
        :title="sizeInfo.title"
        :code-v-node="size"
        :code-desc="sizeInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="loading"
        code='<template>
    <x-button type="info" loading>Info</x-button>
    <x-button type="success" :loading="true">Success</x-button>
    <x-button type="warning" :loading="true">Warning</x-button>
    <x-button type="error" :loading="true">Error</x-button>
</template>'
        :title="loadingInfo.title"
        :code-v-node="loading"
        :code-desc="loadingInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="block"
        code='<template>
    <x-button type="info" block>Info</x-button> <br>
    <x-button type="success" block>Success</x-button> <br>
    <x-button type="warning" block>Warning</x-button> <br>
    <x-button type="error" block>Error</x-button>
</template>'
        :title="blockInfo.title"
        :code-v-node="block"
        :code-desc="blockInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="icons"
        code='<script lang="ts">
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
</script>
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
</template>'
        :title="iconsInfo.title"
        :code-v-node="icons"
        :code-desc="iconsInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
