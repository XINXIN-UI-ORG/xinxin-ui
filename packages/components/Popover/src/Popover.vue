<script lang="ts">
import { defineComponent, ref } from "vue";
import { popoverProps, usePopover } from "./popover.ts";
import { generateClassName } from "@xinxin-ui/utils";
import PopoverTrigger from "./PopoverTrigger.tsx";
import PopoverArrow from "./popoverArrow.tsx";

export default defineComponent({
    name: "x-popover",
    props: popoverProps,
    setup(props) {
        // 被定位的内容
        let popoverContentRef = ref<HTMLDivElement | null>(null);
        let gcn = generateClassName("popover");
        usePopover(popoverContentRef, props);
        return {
            gcn,
            popoverContentRef,
        };
    },
    components: {
        PopoverTrigger,
        PopoverArrow,
    },
});
</script>
<template>
    <popover-trigger>
        <slot />
    </popover-trigger>
    <teleport to="body">
        <div
            ref="popoverContentRef"
            :class="[
                gcn.base(),
                gcn.bm(theme),
            ]"
        >
            <slot name="content">
                {{content}}
            </slot>
            <popover-arrow
                v-bind="$props"
                :class="[
                    gcn.e('arrow'),
                ]"
            />
        </div>
    </teleport>
</template>
<style lang="stylus" scoped src="../style/popover.styl"></style>