<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { popoverProps, usePopover, PopoverPropsType } from "./popover";
import { generateClassName } from "@xinxin-ui/utils";
import PopoverTrigger from "./PopoverTrigger";

export default defineComponent({
    name: "x-popover",
    props: popoverProps,
    inheritAttrs: false,
    setup(props: PopoverPropsType) {
        let gcn = generateClassName("popover");
        let popoverShow = ref<boolean>(false);
        watchEffect(() => {
            if (props.show !== undefined) {
                popoverShow.value = props.show;
            }
        });
        // 被定位的内容
        let popoverContentRef = ref<HTMLDivElement | null>(null);
        // arrow内容
        let popoverArrow = ref<HTMLDivElement | null>(null);
        usePopover(popoverContentRef, popoverArrow, props);
        return {
            gcn,
            popoverContentRef,
            popoverShow,
            popoverArrow,
            popperStyle: computed(() => ({
                "--margin": `${props.ignoreContent
                    ? 0
                    : props.showArrow
                        ? props.offset
                        : 4}px`,
                "--position": `${props.ignoreContent
                    ? 0
                    : props.showArrow
                        ? -props.offset
                        : -4}px`,
            })),
        };
    },
    components: {
        PopoverTrigger,
    },
});
</script>
<template>
    <popover-trigger
        v-model:popover-show="popoverShow"
        :popover-show="popoverShow"
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
                v-if="popoverShow"
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