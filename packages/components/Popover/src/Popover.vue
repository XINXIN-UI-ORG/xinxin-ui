<script lang="ts">
import { defineComponent, ref } from "vue";
import { popoverProps, usePopover } from "./popover.ts";
import { generateClassName } from "@xinxin-ui/utils";
import PopoverTrigger from "./PopoverTrigger.tsx";

export default defineComponent({
    name: "x-popover",
    props: popoverProps,
    setup(props) {
        let gcn = generateClassName("popover");
        let popoverShow = ref<boolean>(false);
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
    >
        <slot />
    </popover-trigger>
    <teleport to="body">
        <transition name="x-popover-transition">
            <div
                ref="popoverContentRef"
                :class="[
                    gcn.base(),
                    gcn.bm(theme),
                ]"
                v-if="popoverShow"
            >
                <slot name="content">
                    {{content}}
                </slot>
                <div
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