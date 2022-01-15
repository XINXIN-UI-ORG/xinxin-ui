<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import type { ButtonType, ButtonSize, ResultType } from "./XButton.types";
import { buttonTheme, buttonSize, modifyColor } from "./theme";

export default defineComponent({
    name: "x-button",
    inheritAttrs: false,
    props: {
        type: {
            type: String as PropType<ButtonType>,
            default: "default"
        },
        size: {
            type: String as PropType<ButtonSize>,
            default: "normal"
        },
    },
    setup(props, { attrs }) {
        const clickAnimateRef = ref<HTMLDivElement>();

        // 劫持用户点击事件
        function clickBtn(e: MouseEvent) {
            e.stopPropagation();
            e.preventDefault();
            clickAnimateRef.value?.classList.add("x-button__click-active");
            setTimeout(() => {
                clickAnimateRef.value?.classList.remove("x-button__click-active");
            }, 600);
            if (attrs.secondary !== undefined) {
                console.log("================");
            }
        }
        // 设置按钮属性
        const buttonStyle = Object.assign(buttonTheme[props.type]??{}, buttonSize[props.size]??{});
        return {
            ...buttonStyle,
            clickBtn,
            clickAnimateRef,
        } as ResultType;
    },
});
</script>
<template>
    <button class="x-button" @click="clickBtn">
        <slot>XINXIN-UI</slot>
        <div class="x-button__click" ref="clickAnimateRef"></div>
    </button>
</template>
<style lang="stylus" scoped>
.x-button
    cursor pointer
    line-height 1
    outline none
    position relative
    background-color v-bind(bgColor)
    border v-bind(border)
    color v-bind(textColor)
    border-radius v-bind(borderRadius)
    padding 0 v-bind(buttonPadding)
    height v-bind(buttonHeight)
    font-size v-bind(buttonFont)
    transition color .2s, background-color .5s
    &:hover
        border v-bind(hoverBorder)
        color v-bind(hoverTextColor)
        background-color v-bind(hoverBgColor)
    &:focus
        border v-bind(visitedBorder)
        color v-bind(visitedTextColor)
    &:active
        border v-bind(activeBorder)
        color v-bind(activeTextColor)
        background-color v-bind(activeBgColor)
    .x-button__click
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        z-index -1
        animation-iteration-count 1
        animation-timing-function cubic-bezier(0, 0, 0.2, 1)
        animation-duration .6s
        border-radius v-bind(borderRadius)
    .x-button__click-active
        animation-name button-click-wave

@keyframes button-click-wave {
    0% {
        box-shadow: 0 0 0.5px 0 v-bind(waveColor);
        opacity: .85;
    }
    100% {
        box-shadow: 0 0 0.5px 5.5px v-bind(waveColor);
        opacity: 0;
    }
}
</style>
