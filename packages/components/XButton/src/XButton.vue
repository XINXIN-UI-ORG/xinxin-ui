<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import type { ButtonType, ButtonSize } from "./XButton.types";
import { buttonOutter, buttonSize, getButtonTypeStyle, PersistenceStyle } from "./theme";
import { Load } from "xinxin-icons";

export default defineComponent({
    name: "x-button",
    inheritAttrs: false,
    props: {
        type: {
            type: String as PropType<ButtonType>,
            default: "info"
        },
        size: {
            type: String as PropType<ButtonSize>,
            default: "normal"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>,
            default: () => undefined,
        },
        loading: {
            type: Boolean,
            default: false
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
            // 执行用户点击事件
            props.onClick?.(e);
        }
        // 设置按钮样式
        let buttonStyle = getButtonTypeStyle(props.type, attrs.secondary as string, attrs.tertiary as string, attrs.quaternary as string,
                attrs.dashed as string, attrs.plain as string, attrs.ghost as string)??{};
        // 设置按钮大小
        buttonStyle = Object.assign(buttonStyle, buttonSize[props.size]??{});
        // 设置按钮轮廓
        buttonStyle = Object.assign(buttonStyle, buttonOutter.default);
        if (attrs.round !== undefined) {
            buttonStyle = Object.assign(buttonStyle, buttonOutter.round);
        }
        if (attrs.circle !== undefined) {
            buttonStyle = Object.assign(buttonStyle, buttonOutter.circle);
            buttonStyle.buttonWidth = buttonStyle.buttonHeight;
        }
        // 将样式对象变成响应式对象
        const reactiveButtonStyle = reactive(buttonStyle);
        const persistence: PersistenceStyle = new PersistenceStyle();
        return {
            reactiveButtonStyle,
            clickBtn,
            clickAnimateRef,
            disabledStyle: computed(() => {
                if (!props.disabled && !props.loading) {
                    // 禁用取消 恢复按钮样式
                    persistence.restore(reactiveButtonStyle);
                    return {};
                }
                const disabledStyle = {
                    'cursor': props.disabled ? 'not-allowed' : 'wait',
                    "opacity": props.disabled ? ".5" : "1"
                };
                // hover、active和focus时不切换样式
                // 修改前先持久化对象
                persistence.store(reactiveButtonStyle);
                persistence.disable(reactiveButtonStyle);
                return disabledStyle;
            }),
        };
    },
    components: {
        Load,
    },
});
</script>
<template>
    <button class="x-button" @click="clickBtn" :disabled="disabled || loading" :style="disabledStyle">
        <div class="x-button__text">
            <span class="pre-icon" v-if="!loading">
                <slot name="pre-icon"></slot>
            </span>
            <span class="pre-icon" v-else>
                <Load />
            </span>
            <slot>XINXIN-UI</slot>
            <span class="suf-icon">
                <slot name="suf-icon"></slot>
            </span>
        </div>
        <div class="x-button__click" ref="clickAnimateRef"></div>
    </button>
</template>
<style lang="stylus" scoped>
.x-button
    cursor pointer
    outline none
    position relative
    box-sizing border-box
    text-align center
    line-height 1
    background-color v-bind('reactiveButtonStyle.bgColor')
    border v-bind('reactiveButtonStyle.border')
    color v-bind('reactiveButtonStyle.textColor')
    border-radius v-bind('reactiveButtonStyle.borderRadius')
    padding 0 v-bind('reactiveButtonStyle.buttonPadding')
    height v-bind('reactiveButtonStyle.buttonHeight')
    width v-bind('reactiveButtonStyle.buttonWidth')
    font-size v-bind('reactiveButtonStyle.buttonFont')
    transition color .2s, background-color .5s, border .5s
    &:focus
        border v-bind('reactiveButtonStyle.visitedBorder')
        color v-bind('reactiveButtonStyle.visitedTextColor')
        background-color v-bind('reactiveButtonStyle.visitedBgColor')
    &:hover
        border v-bind('reactiveButtonStyle.hoverBorder')
        color v-bind('reactiveButtonStyle.hoverTextColor')
        background-color v-bind('reactiveButtonStyle.hoverBgColor')
    &:active
        border v-bind('reactiveButtonStyle.activeBorder')
        color v-bind('reactiveButtonStyle.activeTextColor')
        background-color v-bind('reactiveButtonStyle.activeBgColor')
    .x-button__text
        width 100%
        height 100%
        display flex
        justify-content center
        align-items center
        overflow hidden
        :deep(.asa-icon)
            vertical-align text-top
            height v-bind('reactiveButtonStyle.buttonFont')
            width v-bind('reactiveButtonStyle.buttonFont')
        .pre-icon
            :deep(.asa-icon)
                margin-right v-bind('reactiveButtonStyle.iconMargin')
        .suf-icon
            :deep(.asa-icon)
                margin-left v-bind('reactiveButtonStyle.iconMargin')
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
        border-radius v-bind('reactiveButtonStyle.borderRadius')
    .x-button__click-active
        animation-name button-click-wave

@keyframes button-click-wave {
    0% {
        box-shadow: 0 0 1px 0 v-bind('reactiveButtonStyle.waveColor');
        opacity: .85;
    }
    100% {
        box-shadow: 0 0 1px 5.5px v-bind('reactiveButtonStyle.waveColor');
        opacity: 0;
    }
}
</style>
