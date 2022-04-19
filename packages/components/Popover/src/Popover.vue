<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { popoverProps, usePopover } from "./popover.ts";
import { generateClassName } from "@xinxin-ui/utils";
import PopoverTrigger from "./PopoverTrigger.tsx";

export default defineComponent({
    name: "x-popover",
    props: popoverProps,
    setup(props) {
        let gcn = generateClassName("popover");
        let popoverShow = ref<boolean>(false);
        watchEffect(() => {
            if ((<any>props).show !== undefined) {
                popoverShow.value = (<any>props).show;
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
                "--margin": `${(<any>props).ignoreContent
                    ? 0
                    : (<any>props).showArrow
                        ? (<any>props).offset
                        : 5}px`,
                "--position": `${(<any>props).ignoreContent
                    ? 0
                    : (<any>props).showArrow
                        ? -(<any>props).offset
                        : -5}px`,
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
        v-bind="$props"
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
                :style="popperStyle"
            >
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