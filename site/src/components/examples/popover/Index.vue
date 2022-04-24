<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";

export default defineComponent({
    setup() {
        let containerRef = ref();
        let placement = ref<string>("right");
        let popoverShow = ref<boolean>(false);
        const container = computed(() => containerRef.value && containerRef.value.getContainerDom());
        onMounted(() => {
            containerRef.value.scrollTo({
                top: 220,
                left: 230,
            });
        });
        return {
            containerRef,
            popoverShow,
            container,
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
            <x-scrollbar
                :class="classes.wrapper"
                ref="containerRef"
                max-height="350"
            >
                <x-popover
                    :placement="placement"
                    :boundary="container"
                    :show="popoverShow"
                >
                    <img :class="classes.context" src="/logo.png" alt="NO IMG" @click="popoverShow = !popoverShow" />
                    <template #content>
                        <p>XinXin UI</p>
                        <p>A vue3+ts ui repository</p>
                        <p>npm install xinxin-ui</p>
                    </template>
                </x-popover>
            </x-scrollbar>
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
    position relative !important
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
        <x-button plain>点击</x-button>
    </x-popover>
    <x-popover
        trigger="hover"
        content="孤帆远影碧空尽，唯见长江天际流。"
    >
        <x-button plain>悬浮</x-button>
    </x-popover>
    <x-popover
        trigger="hover"
        content="凤凰台上凤凰游，凤去台空江自流。"
        :ignore-content="true"
    >
        <x-button plain>悬浮(忽略主体)</x-button>
    </x-popover>
    <x-popover
        trigger="focus"
        content="杨花落尽子规啼，闻道龙标过五溪。"
    >
        <x-button plain>聚焦</x-button>
    </x-popover>
    <x-popover
        trigger="contextmenu"
        content="吴宫花草埋幽径，晋代衣冠成古丘。"
    >
        <x-button plain>右击</x-button>
    </x-popover>
    <x-popover
        :show="visible"
        content="我寄愁心与明月，随君直到夜郎西。"
    >
        <x-button plain @click="visible = !visible">手动</x-button>
    </x-popover>
</template>`

import ShowArrow from './2ShowArrow.vue'

const showArrowContent = `<template>
    <x-popover
        :show-arrow="false"
        content="小时不识月，呼作白玉盘。"
    >
        <x-button dashed>去除箭头</x-button>
    </x-popover>
</template>`

import Theme from './3Theme.vue'

const themeContent = `<template>
    <x-popover
        content="禁闱秋夜，月探金窗罅。"
        theme="light"
    >
        <x-button ghost type="success">Light</x-button>
    </x-popover>
    <x-popover
        content="刷新"
        theme="dark"
    >
        <x-button ghost type="success">Dark</x-button>
    </x-popover>
    <x-popover
        content="谁家玉笛暗飞声，散入春风满洛城。"
        theme="customized"
    >
        <x-button ghost type="success">Customized</x-button>
    </x-popover>
</template>
<style>
.x-popover.x-popover-customized {
    background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.x-popover.x-popover-customized .x-popover__arrow::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
}
</style>`

import Title from './4Title.vue'

const titleContent = `<template>
    <x-popover
        title="宣州谢朓楼饯别校书叔云"
    >
        <x-button dashed type="error">带标题</x-button>
        <template #content>
            <p>弃我去者，昨日之日不可留；乱我心者，今日之日多烦忧。</p>
            <p>长风万里送秋雁，对此可以酣高楼。蓬莱文章建安骨，中间小谢又清发。</p>
            <p>俱怀逸兴壮思飞，欲上青天览明月。抽刀断水水更流，举杯消愁愁更愁。</p>
            <p>人生在世不称意，明朝散发弄扁舟。</p>
        </template>
    </x-popover>
</template>`

import MaxHeight from './5MaxHeight.vue'

const maxHeightContent = `<template>
    <x-popover
        title="梦游天姥吟留别"
        max-height="100"
    >
        <x-button dashed type="warning">最大高度</x-button>
        <template #content>
            <p>[唐] 李白</p>
            <p>海客谈瀛洲，烟涛微茫信难求。</p>
            <p>越人语天姥，云霞明灭或可睹。</p>
            <p>天姥连天向天横，势拔五岳掩赤城。</p>
            <p>天台一万八千丈，对此欲倒东南倾。</p>
            <p>我欲因之梦吴越，一夜飞度镜湖月。</p>
            <p>湖月照我影，送我至剡溪。</p>
            <p>谢公宿处今尚在，渌水荡漾清猿啼。</p>
            <p>脚著谢公屐，身登青云梯。</p>
            <p>半壁见海日，空中闻天鸡。</p>
            <p>千岩万转路不定，迷花倚石忽已暝。</p>
            <p>熊咆龙吟殷岩泉，栗深林兮惊层巅。</p>
            <p>云青青兮欲雨，水澹澹兮生烟。</p>
            <p>列缺霹雳，丘峦崩摧。洞天石扉，訇然中开。</p>
            <p>青冥浩荡不见底，日月照耀金银台。</p>
            <p>霓为衣兮风为马，云之君兮纷纷而来下。</p>
            <p>虎鼓瑟兮鸾回车，仙之人兮列如麻。</p>
            <p>忽魂悸以魄动，恍惊起而长嗟。</p>
            <p>惟觉时之枕席，失向来之烟霞。</p>
            <p>世间行乐亦如此，古来万事东流水。</p>
            <p>别君去兮何时还，且放白鹿青崖间，</p>
            <p>须行即骑访名山。安能摧眉折腰事权贵，</p>
            <p>使我不得开心颜。</p>
        </template>
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

      Theme,
      themeContent,
      themeInfo: info.theme,

      Title,
      titleContent,
      titleInfo: info.title,

      MaxHeight,
      maxHeightContent,
      maxHeightInfo: info.maxHeight,

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

      <CodeExample
        id="title"
        :code="titleContent"
        :title="titleInfo.title"
        :code-v-node="Title"
        :code-desc="titleInfo.desc"
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

      <CodeExample
        id="theme"
        :code="themeContent"
        :title="themeInfo.title"
        :code-v-node="Theme"
        :code-desc="themeInfo.desc"
      >
      </CodeExample>

      <CodeExample
        id="maxHeight"
        :code="maxHeightContent"
        :title="maxHeightInfo.title"
        :code-v-node="MaxHeight"
        :code-desc="maxHeightInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
