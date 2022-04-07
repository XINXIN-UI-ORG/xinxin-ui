<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import type { IconSize } from "./XLoadOptions.types";

export default defineComponent({
  props: {
    alpha: {
      type: Number,
      default: 1,
    },
    description: String,
    color: {
      type: String,
      default: "#f5a31f",
    },
    iconSize: {
      type: String as PropType<IconSize>,
      default: "small",
    },
  },
  setup(props, { expose }) {
    let loadRootRef = ref<HTMLDivElement>();
    // 提供隐藏和显示组件的方法
    expose({
      showLoad() {
        loadRootRef.value?.classList.add("x-load-show");
      },
      hiddenLoad() {
        loadRootRef.value?.classList.remove("x-load-show");
      },
    });
    return {
      loadRootRef,
      wrapStyle: computed(() => ({
        "background-color": `rgba(255, 255, 255, ${props.alpha})`,
      })),
      colorStyle: computed(() => ({
        color: props.color,
      })),
      iconSize: computed(() => {
        let fontSize = 40;
        if (props.iconSize === "medium") {
          fontSize = 60;
        }
        if (props.iconSize === "large") {
          fontSize = 80;
        }
        return fontSize + "px";
      }),
    };
  },
});
</script>
<template>
  <div class="x-load" :style="wrapStyle" ref="loadRootRef">
    <div class="x-load__container" :style="colorStyle">
      <div class="x-load__container__desc">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :width="iconSize"
          :height="iconSize"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <circle cx="60" cy="50" r="4" :fill="color">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="95;35"
                keyTimes="0;1"
                begin="-0.9983000000000001s"
              ></animate>
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="-0.9983000000000001s"
              ></animate>
            </circle>
            <circle cx="60" cy="50" r="4" :fill="color">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="95;35"
                keyTimes="0;1"
                begin="-0.4917s"
              ></animate>
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="-0.4917s"
              ></animate>
            </circle>
            <circle cx="60" cy="50" r="4" :fill="color">
              <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="95;35"
                keyTimes="0;1"
                begin="0s"
              ></animate>
              <animate
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="0s"
              ></animate>
            </circle>
          </g>
          <g transform="translate(-15 0)">
            <path
              d="M50 50L20 50A30 30 0 0 0 80 50Z"
              fill="#f8b26a"
              transform="rotate(90 50 50)"
            ></path>
            <path d="M50 50L20 50A30 30 0 0 0 80 50Z" :fill="color">
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="0 50 50;45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              ></animateTransform>
            </path>
            <path d="M50 50L20 50A30 30 0 0 1 80 50Z" :fill="color">
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.6711409395973155s"
                values="0 50 50;-45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              ></animateTransform>
            </path>
          </g>
        </svg>
      </div>
      <div class="load-desc" v-if="description !== undefined">
        {{ description }}
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.x-load
    position absolute
    inset 0
    z-index 10000
    display flex
    justify-content center
    align-items center
    transition all .5s
    opacity 0
    visibility hidden
    .x-load__container
        line-height 1
        .x-load__container__desc
            margin-bottom 5px
.x-load-show
    transition none
    visibility visible
    opacity 1
</style>
