<script lang="ts">
import { ref, defineComponent } from 'vue';
import CodeExample from "../../PublicComponent/CodeExample.vue";
import Base from "./Base.vue";
import * as XinXinIcons from "@xinxin-ui/xinxin-icons";
import { copyToClipBoard } from "../../../utils"

export default defineComponent({
  setup() {
    let filterIconObj = (filter: string = "") => {
      return Object.keys(XinXinIcons).filter(item => item.toLowerCase() !== "default" && item.toLowerCase().includes(filter.toLowerCase()))
        .map(item => ({
          "name": item,
          "tips": "点击复制",
          "type": "warning"
        }));
    };
    let iconList = ref(filterIconObj());
    return {
      code: `
<script lang="ts">
import { defineComponent } from "vue";
import { Star } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        
    },
    components: {
        Star,
    },
})
<\/script>
<template>
  <Star class="star" />
  <Star class="star" />
  <Star class="star" />
  <Star class="star" />
  <Star class="star" />
</template>
<style scoped>
.star {
    color: #f5a31f;
    width: 26px;
    height: 26px;
}
.star:nth-of-type(2) {
    color: #0077fa;
}
.star:nth-of-type(3) {
    color: #41b883;
}
.star:nth-of-type(4) {
    color: #d03050;
}
</style>
      `,
      desc: "通过css可以控制图标的大小跟颜色。",
      Base,
      searchIcon(value: string) {
        iconList.value = filterIconObj(value);
      },
      iconList,
      copyIcon(iconName: string, item: { [propName: string]: string }) {
        copyToClipBoard(iconName, `${iconName}组件复制成功🎉`);
        item.tips = "复制成功";
        item.type = "success";
        setTimeout(() => {
          item.tips = "点击复制";
          item.type = 'warning';
        }, 1000);
      }
    }
  },
  components: {
    CodeExample,
    ...XinXinIcons,
  },
});
</script>
<template>
  <h2 class="install" id="install">安装</h2>
  <n-alert title="提示" type="info">
    <span class="tag">xinxin-ui</span>提供了专门的图标库<span class="tag">@xinxin-ui/xinxin-icons</span>,使用包管理器下载以使用。
    <div class="install-code">
      <p><span class="mark">npm install</span> @xinxin-ui/xinxin-icons</p>
      <p><span class="mark">yarn add</span> @xinxin-ui/xinxin-icons</p>
      <p><span class="mark">pnpm install</span> @xinxin-ui/xinxin-icons</p>
    </div>
  </n-alert>
  <h2 class="use" id="use">使用方式</h2>
  <CodeExample
    :code="code"
    title="基础使用"
    :code-v-node="Base"
    :code-desc="desc"
  >
  </CodeExample>
  <h2 id="icon_gather">图标集合</h2>
  <div class="gather">
    <span class="search">
      <x-input placeholder="搜索图标" size="normal" @onInputChange="searchIcon" />
    </span>
    <div class="icon-wrap">
      <div class="icon-item" v-for="(item, index) in iconList" :key="index">
        <div class="left">
          <component :is="item.name" />
        </div>
        <div class="right">
          <div class="icon-name">{{ item.name }}</div>
          <div class="copy-wrap">
            <x-button dashed :type="item.type" @click="copyIcon(item.name, item)">{{ item.tips }}</x-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.install
  color #606266
  margin-bottom 10px
.tag
  background-color #f4f4f8
  border-radius 4px
  padding 2px 4px
.install-code
  padding 10px 20px
  background-color #f5f7fa
  margin-top 20px
  border-radius 8px
  width 400px
  p
    padding 5px 0
  .mark
    color #6196cc
.use
  margin 10px 0
  color #606266
#icon_gather
  margin 45px 0 10px 0
  color #606266
.gather
  font-size 14px
  position relative
  .search
    position absolute
    top -40px
    right 0
  .icon-wrap
    display grid
    grid-template-columns repeat(auto-fill, 200px)
    justify-content space-between
    .icon-item
      border 1px dashed #eee
      border-radius 6px
      cursor pointer
      margin 10px 0
      height 55px
      overflow hidden
      .left
        float left
        height 100%
        margin 0 20px 0 10px
        svg
          color #606266
          width 30px
          height 30px
          margin-top 12.5px
      .right
        width 138px
        height 100%
        float right
        position relative
        .icon-name
          height 100%
          line-height 55px
          color #252245
          font-weight 700
          white-space nowrap
          text-overflow ellipsis
          overflow hidden
        .copy-wrap
          width 100%
          height 55px
          line-height 55px
          text-align center
          position absolute
          top 55px
          background-color #252245e6
          border-radius 6px
          transition top .5s
        &:hover
          .copy-wrap
            top 0
</style>