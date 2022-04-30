<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '../../PublicComponent/Layout.vue'
import CodeExample from '../../PublicComponent/CodeExample.vue'
import Table from '../../PublicComponent/Table.vue'
import * as info from './info'

import Base from './0Base.vue'

const baseContent = `<template>
    <x-scrollbar
        max-height="150"
    >
        <h3>《将进酒·君不见黄河之水天上来》</h3>
        <div>
            <p>君不见黄河之水天上来，奔流到海不复回。</p>
            <p>君不见高堂明镜悲白发，朝如青丝暮成雪。</p>
            <p>人生得意须尽欢，莫使金樽空对月。</p>
            <p>天生我材必有用，千金散尽还复来。</p>
            <p>烹羊宰牛且为乐，会须一饮三百杯。</p>
            <p>岑夫子，丹丘生，将进酒，杯莫停。</p>
            <p>与君歌一曲，请君为我倾耳听。</p>
            <p>钟鼓馔玉不足贵，但愿长醉不复醒。</p>
            <p>古来圣贤皆寂寞，惟有饮者留其名。</p>
            <p>陈王昔时宴平乐，斗酒十千恣欢谑。</p>
            <p>主人何为言少钱，径须沽取对君酌。</p>
            <p>五花马，千金裘，</p>
            <p>呼儿将出换美酒，与尔同销万古愁。</p>
        </div>
    </x-scrollbar>
</template>`

import ScrollTo from './1ScrollTo.vue'

const scrollToContent = `<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    setup() {
        let scrollbarRef = ref();
        onMounted(() => {
            scrollbarRef.value.scrollTo({
                top: 100,
                left: 120,
            });
        });
        return {
            scrollbarRef,
            scrollByClick() {
                scrollbarRef.value.scrollBy({
                    top: 100,
                    behavior: 'smooth'
                }); 
            },
        };
    }
});
<\/script>
<template>
    <x-button @click="scrollByClick">scrollBy滚动</x-button>
    <x-scrollbar
        max-height="350"
        ref="scrollbarRef"
        horizontal
    >
        <img :class="classes.context" src="/logo.png" alt="NO IMG" />
    </x-scrollbar>
</template>
<style module="classes" lang="stylus" scoped>
.context
    margin 350px 400px !important
    width 60px
    height 60px
    cursor pointer
</style>`

import Horizontal from './2Horizontal.vue'

const horizontalContent = `<template>
    <x-scrollbar horizontal>
        <div :class="classes.container">
            噫吁嚱，危乎高哉！蜀道之难，难于上青天！
            蚕丛及鱼凫，开国何茫然！
            尔来四万八千岁，不与秦塞通人烟。
            西当太白有鸟道，可以横绝峨眉巅。
            地崩山摧壮士死，然后天梯石栈相钩连。
            上有六龙回日之高标，下有冲波逆折之回川。
            黄鹤之飞尚不得过，猿猱欲度愁攀援。
            青泥何盘盘，百步九折萦岩峦。
            扪参历井仰胁息，以手抚膺坐长叹。
            问君西游何时还？畏途巉岩不可攀。
            但见悲鸟号古木，雄飞雌从绕林间。
            又闻子规啼夜月，愁空山。
            蜀道之难,难于上青天，使人听此凋朱颜！
            连峰去天不盈尺，枯松倒挂倚绝壁。
            飞湍瀑流争喧豗，砯崖转石万壑雷。
            其险也如此，嗟尔远道之人胡为乎来哉！
            剑阁峥嵘而崔嵬，一夫当关，万夫莫开。
            所守或匪亲，化为狼与豺。
            朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。
            锦城虽云乐，不如早还家。
            蜀道之难,难于上青天，侧身西望长咨嗟！
        </div>
    </x-scrollbar>
</template>
<style scoped module="classes">
.container {
    padding: 12px;
    white-space: nowrap;
}
</style>`

export default defineComponent({
  setup() {
    return {
      Base,
      baseContent,
      baseInfo: info.base,

      ScrollTo,
      scrollToContent,
      scrollToInfo: info.scrollTo,

      Horizontal,
      horizontalContent,
      horizontalInfo: info.horizontal,

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
        id="horizontal"
        :code="horizontalContent"
        :title="horizontalInfo.title"
        :code-v-node="Horizontal"
        :code-desc="horizontalInfo.desc"
      >
      </CodeExample>
    </template>
    <template #right>
      <CodeExample
        id="scrollTo"
        :code="scrollToContent"
        :title="scrollToInfo.title"
        :code-v-node="ScrollTo"
        :code-desc="scrollToInfo.desc"
      >
      </CodeExample>
    </template>
  </Layout>
  <Table :api-event="apiEvent" :api-props="apiProps" />
</template>
