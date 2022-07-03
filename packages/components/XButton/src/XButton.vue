<script lang="ts">
import { computed, defineComponent, PropType, ref, inject } from "vue";
import type { ButtonType, ButtonSize } from "./XButton.types";
import { FormItemToComponentKey } from "@xinxin-ui/symbols";
import {
    buttonOutter,
    buttonSize,
    getButtonTypeStyle,
    PersistenceStyle,
} from "./theme";
import { Load } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-button",
    props: {
        type: {
            type: String as PropType<ButtonType>,
            default: "info",
        },
        size: {
            type: String as PropType<ButtonSize>,
            default: "normal",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>,
            default: () => undefined,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: undefined,
        },
    },
    inheritAttrs: false,
    setup(props, { attrs }) {
        let formItem = inject(FormItemToComponentKey, {
            size: props.size,
        });

        const clickAnimateRef = ref<HTMLDivElement>();
        // 劫持用户点击事件
        function clickBtn(e: MouseEvent) {
            e.stopPropagation();
            e.preventDefault();
            clickAnimateRef.value?.classList.add("x-button__click-active");
            setTimeout(() => {
                clickAnimateRef.value?.classList.remove(
                    "x-button__click-active"
                );
            }, 600);
            // 执行用户点击事件
            props.onClick?.(e);
        }
        // 设置按钮样式
        let buttonStyle = computed(() => {
            let style = getButtonTypeStyle(
                props.type,
                props.color,
                attrs.secondary as string,
                attrs.tertiary as string,
                attrs.quaternary as string,
                attrs.dashed as string,
                attrs.plain as string,
                attrs.ghost as string
            ) ?? {};
            // 设置按钮大小
            style = Object.assign(style, buttonSize[formItem.size] ?? {});
            // 设置按钮轮廓
            style = Object.assign(style, buttonOutter.default);
            if (attrs.round !== undefined) {
                style = Object.assign(style, buttonOutter.round);
            }
            if (attrs.circle !== undefined) {
                style = Object.assign(style, buttonOutter.circle);
                style.buttonWidth = style.buttonHeight;
            }
            // 块级按钮
            if (attrs.block !== undefined) {
                style.display = "block";
                style.buttonWidth = "100%";
            }
            return style;
        });
        const persistence: PersistenceStyle = new PersistenceStyle();
        return {
            buttonStyle,
            clickBtn,
            clickAnimateRef,
            disabledStyle: computed(() => {
                if (!props.disabled && !props.loading) {
                    // 禁用取消 恢复按钮样式
                    persistence.restore(buttonStyle.value);
                    return {};
                }
                const disabledStyle = {
                    cursor: props.disabled ? "not-allowed" : "wait",
                    opacity: props.disabled ? ".5" : "1",
                };
                // hover、active和focus时不切换样式
                // 修改前先持久化对象
                persistence.store(buttonStyle.value);
                persistence.disable(buttonStyle.value);
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
    <button
        class="x-button"
        @click="clickBtn"
        :disabled="disabled || loading"
        :style="disabledStyle"
    >
        <div class="x-button__text">
            <span class="pre-icon" v-if="!loading">
                <slot name="pre-icon"></slot>
            </span>
            <span class="pre-icon" v-else>
                <Load />
            </span>
            <slot>XinXin-UI</slot>
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
    vertical-align middle
    display v-bind("buttonStyle.display")
    background-color v-bind('buttonStyle.bgColor')
    border v-bind('buttonStyle.border')
    color v-bind('buttonStyle.textColor')
    border-radius v-bind('buttonStyle.borderRadius')
    padding 0 v-bind('buttonStyle.buttonPadding')
    height v-bind('buttonStyle.buttonHeight')
    width v-bind('buttonStyle.buttonWidth')
    font-size v-bind('buttonStyle.buttonFont')
    transition color .2s, background-color .5s, border .5s
    &:focus
        border v-bind('buttonStyle.visitedBorder')
        color v-bind('buttonStyle.visitedTextColor')
        background-color v-bind('buttonStyle.visitedBgColor')
    &:hover
        border v-bind('buttonStyle.hoverBorder')
        color v-bind('buttonStyle.hoverTextColor')
        background-color v-bind('buttonStyle.hoverBgColor')
    &:active
        border v-bind('buttonStyle.activeBorder')
        color v-bind('buttonStyle.activeTextColor')
        background-color v-bind('buttonStyle.activeBgColor')
    .x-button__text
        width 100%
        height 100%
        display flex
        justify-content center
        align-items center
        overflow hidden
        :deep(.asa-icon)
            vertical-align text-top
            height v-bind('buttonStyle.buttonFont')
            width v-bind('buttonStyle.buttonFont')
        .pre-icon
            :deep(.asa-icon)
                margin-right v-bind('buttonStyle.iconMargin')
        .suf-icon
            :deep(.asa-icon)
                margin-left v-bind('buttonStyle.iconMargin')
    .x-button__click
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        animation-iteration-count 1
        animation-timing-function cubic-bezier(0, 0, 0.2, 1)
        animation-duration .6s
        border-radius v-bind('buttonStyle.borderRadius')
    .x-button__click-active
        animation-name button-click-wave

@keyframes button-click-wave {
    0% {
        box-shadow: 0 0 1px 0 v-bind('buttonStyle.waveColor');
        opacity: .85;
    }
    100% {
        box-shadow: 0 0 1px 5.5px v-bind('buttonStyle.waveColor');
        opacity: 0;
    }
}

@-webkit-keyframes button-click-wave {
    0% {
        box-shadow: 0 0 1px 0 v-bind('buttonStyle.waveColor');
        opacity: .85;
    }
    100% {
        box-shadow: 0 0 1px 5.5px v-bind('buttonStyle.waveColor');
        opacity: 0;
    }
}
</style>
