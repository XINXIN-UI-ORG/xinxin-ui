<script lang="ts">
import { defineComponent, ref } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { scrollbarProps, useScrollbar, scrollbarEmits } from "./scrollbar";
import type { ScrollbarPropsType } from "./scrollbar";

export default defineComponent({
    name: "x-scrollbar",
    props: scrollbarProps,
    emits: scrollbarEmits,
    setup(props: ScrollbarPropsType, { expose, emit }) {
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
        }, expose, emit);
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
            stopBlur(e: Event) {
                e.preventDefault();
                return false;
            },
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
                @click.stop
                @mousedown="stopBlur"
                @mouseup="stopBlur"
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
                @click.stop
                @mousedown="stopBlur"
                @mouseup="stopBlur"
            />
        </div>
    </div>
</template>
<style lang="stylus" scoped src="../style/scrollbar.styl" />