<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    setup() {
        let containerRef = ref<HTMLDivElement>();
        let placement = ref<string>("right");
        onMounted(() => {
            containerRef.value!.scrollTop = 220;
            containerRef.value!.scrollLeft = 230;
        })
        return {
            containerRef,
            placement
        };
    }
})
<\/script>
<template>
    <div :class="classes.container">
        <div :class="classes.left">
            <x-button dashed type="info" @click="placement = 'left-start'">Left Start</x-button>
            <x-button dashed type="success" @click="placement = 'left'">Left</x-button>
            <x-button dashed type="warning" @click="placement = 'left-end'">Left End</x-button>
        </div>
        <div :class="classes.display">
            <div :class="classes.top">
                <x-button tertiary type="info" @click="placement = 'top-start'">Top Start</x-button>
                <x-button tertiary type="success" @click="placement = 'top'">Top</x-button>
                <x-button tertiary type="warning" @click="placement = 'top-end'">Top End</x-button>
            </div>
            <div :class="classes.wrapper" ref="containerRef">
                <x-popover
                    :placement="placement"
                    :boundary="containerRef"
                >
                    <img :class="classes.context" src="/logo.png" alt="NO IMG" />
                    <template #content>
                        <p>XinXin UI</p>
                        <p>A vue3+ts ui repository</p>
                        <p>npm install xinxin-ui</p>
                    </template>
                </x-popover>
            </div>
            <div :class="classes.top">
                <x-button ghost type="info" @click="placement = 'bottom-start'">Bottom Start</x-button>
                <x-button ghost type="success" @click="placement = 'bottom'">Bottom</x-button>
                <x-button ghost type="warning" @click="placement = 'bottom-end'">Bottom End</x-button>
            </div>
        </div>
        <div :class="classes.left">
            <x-button secondary type="info" @click="placement = 'right-start'">Right Start</x-button>
            <x-button secondary type="success" @click="placement = 'right'">Right</x-button>
            <x-button secondary type="warning" @click="placement = 'right-end'">Right End</x-button>
        </div>
    </div>
</template>
<style module="classes" lang="stylus">
.wrapper
    border 2px dashed rgb(255, 107, 129)
    background-color rgb(40, 30, 54)
    border-radius 10px
    overflow auto
    overscroll-behavior contain
    position relative !important
    height 350px
    box-sizing border-box
.container
    display flex
    width 100%
.left
    display flex
    flex-direction column
    justify-content space-around
    margin 0 5px
.top
    display flex
    justify-content space-around
    margin 5px 0
.display
    flex 1
    overflow hidden
.context
    margin 350px 400px !important
    width 60px
    height 60px
    cursor pointer
</style>
<style lang="stylus" scoped>
.x-button
    margin: 0 !important
</style>
`

import Active from './1Active.vue'

const activeContent = `<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let visible = ref<boolean>(false);
        return {
            visible,
        };
    }
});
<\/script>
<template>
    <x-popover
        trigger="click"
        content="故人西辞黄鹤楼，烟花三月下扬州。"
    >
        <x-button plain type="success">Click to active</x-button>
    </x-popover>
    <x-popover
        trigger="hover"
        content="孤帆远影碧空尽，唯见长江天际流。"
    >
        <x-button plain type="warning">Hover to active</x-button>
    </x-popover>
    <x-popover
        trigger="focus"
        content="杨花落尽子规啼，闻道龙标过五溪。"
    >
        <x-button plain type="warning">Focus to active</x-button>
    </x-popover>
    <x-popover
        :show="visible"
        content="我寄愁心与明月，随君直到夜郎西。"
    >
        <x-button plain type="error" @click="visible = !visible">Manual to active</x-button>
    </x-popover>
</template>`

import ShowArrow from './2ShowArrow.vue'

const showArrowContent = `<template>
    <x-popover

    >
        <x-button dashed>去除箭头</x-button>
    </x-popover>
</template>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      Active,
      activeContent,
      activeInfo: info.active,

      ShowArrow,
      showArrowContent,
      showArrowInfo: info.showArrow,

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
        id="showArrow"
        :code="showArrowContent"
        :title="showArrowInfo.title"
        :code-v-node="ShowArrow"
        :code-desc="showArrowInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="active"
        :code="activeContent"
        :title="activeInfo.title"
        :code-v-node="Active"
        :code-desc="activeInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
