<script lang="ts">
import { defineComponent, ref } from "vue";
import { popoverProps, usePopover, PopoverPropsType, popoverEmits } from "./popover";
import { generateClassName } from "@xinxin-ui/utils";
import PopoverTrigger from "./PopoverTrigger";
import XScrollbar from "../../Scrollbar";

export default defineComponent({
    name: "x-popover",
    props: popoverProps,
    emits: popoverEmits,
    inheritAttrs: false,
    setup(props: PopoverPropsType, { expose, emit }) {
        let gcn = generateClassName("popover");
        
        // 被定位的内容
        let popoverContentRef = ref<HTMLDivElement | null>(null);
        // arrow内容
        let popoverArrow = ref<HTMLDivElement | null>(null);
        let { popperStyle, popoverScroll, popoverShow } = usePopover(popoverContentRef, popoverArrow, props, expose, emit);
        return {
            gcn,
            popoverContentRef,
            popoverShow,
            popoverArrow,
            popperStyle,
            popoverScroll,
        };
    },
    components: {
        PopoverTrigger,
        XScrollbar,
    },
});
</script>
<template>
    <popover-trigger
        v-model:popover-show="popoverShow"
        :show="show"
        :trigger="trigger"
        :ignore-content="ignoreContent"
    >
        <slot />
    </popover-trigger>
    <teleport to="body">
        <transition name="x-popover-transition">
            <div
                :style="(popperStyle as any)"
                ref="popoverContentRef"
                :class="[
                    gcn.base(),
                    gcn.bm(theme),
                ]"
                v-show="popoverShow"
            >
                <x-scrollbar
                    :max-height="maxHeight"
                    @scroll="popoverScroll"
                >
                    <div
                        v-if="title"
                        :class="[
                            gcn.e('title')
                        ]"
                    >
                        {{title}}
                    </div>
                    <slot name="content">
                        {{content}}
                    </slot>
                </x-scrollbar>
                <div
                    v-if="showArrow"
                    :class="[
                        gcn.e('arrow'),
                    ]"
                    ref="popoverArrow"
                />
            </div>
        </transition>
    </teleport>
</template>
<style lang="stylus" scoped src="../style/popover.styl"></style>