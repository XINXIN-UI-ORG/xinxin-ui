<script lang="ts">
import { defineComponent, ref } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { scrollbarProps, useScrollbar } from "./scrollbar";
import type { ScrollbarPropsType } from "./scrollbar";

export default defineComponent({
    name: "x-scrollbar",
    props: scrollbarProps,
    setup(props: ScrollbarPropsType, { expose }) {
        let scrollbarContainerRef = ref<HTMLDivElement | null>(null);
        let scrollbarContentRef = ref<HTMLDivElement | null>(null);
        let scrollVerticalBarRef = ref<HTMLDivElement | null>(null);
        let scrollVerticalTrackRef = ref<HTMLDivElement | null>(null);
        let scrollHorizontalTrackRef = ref<HTMLDivElement | null>(null);
        let scrollHorizontalBarRef = ref<HTMLDivElement | null>(null);
        let gcn = generateClassName("scrollbar");
        let { scrollStyle, barStyle, contentStyle } = useScrollbar(props, {
            scrollbarContainerRef,
            scrollbarContentRef,
            scrollVerticalBarRef,
            scrollVerticalTrackRef,
            scrollHorizontalTrackRef,
            scrollHorizontalBarRef,
        }, expose);
        return {
            scrollHorizontalTrackRef,
            scrollHorizontalBarRef,
            scrollbarContainerRef,
            scrollbarContentRef,
            scrollVerticalBarRef,
            scrollVerticalTrackRef,
            gcn,
            scrollStyle,
            barStyle,
            contentStyle,
        };
    },
})
</script>
<template>
    <div
        :class="[
            gcn.base(),
        ]"
        :style="(barStyle as any)"
    >
        <div
            :class="[
                gcn.e('container'),  
            ]"
            :style="(scrollStyle as any)"
            ref="scrollbarContainerRef"
        >
            <div
                :class="[
                    gcn.e('container', 'content'),  
                ]"
                ref="scrollbarContentRef"
                :style="contentStyle"
            >
                <slot></slot>
            </div>
        </div>
        <div
            :class="[
                gcn.e('vertical'),
            ]"
            ref="scrollVerticalTrackRef"
        >
            <div
                :class="[
                    gcn.e('vertical', 'bar'),
                    gcn.e('bar'),
                ]"
                ref="scrollVerticalBarRef"
            />
        </div>
        <div
            :class="[
                gcn.e('horizontal'),
            ]"
            ref="scrollHorizontalTrackRef"
        >
            <div
                :class="[
                    gcn.e('horizontal', 'bar'),
                    gcn.e('bar'),
                ]"
                ref="scrollHorizontalBarRef"
            />
        </div>
    </div>
</template>
<style lang="stylus" scoped src="../style/scrollbar.styl" />