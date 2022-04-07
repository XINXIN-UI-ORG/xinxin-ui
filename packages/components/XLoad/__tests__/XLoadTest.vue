<script lang="ts">
import { defineComponent, ref } from "vue";
import XLoad, { XLoadHandler } from "..";
import { XMessage } from "../../XMessage";

export default defineComponent({
    setup() {
        let targetRef = ref();
        const fullScreenLoad: XLoadHandler | null = XLoad();
        const targetLoad: XLoadHandler | null = XLoad({
            description: "在目标上加载...",
        });
        const nonTextLoad: XLoadHandler | null = XLoad();
        return {
            targetRef,
            fullScrollLoad() {
                fullScreenLoad?.show();
                setTimeout(() => fullScreenLoad?.destroy(() => XMessage("销毁成功")), 1000);
            },
            targetScrollLoad() {
                targetLoad?.show(targetRef.value);
            },
            targetScrollLoadClose() {
                targetLoad?.close();
            },
            targetScrollLoadDestroy() {
                targetLoad?.destroy();
            },
            nonTextScrollLoad() {
                nonTextLoad?.show(targetRef.value);
            },
            smallScrollLoad() {
                const smallLoad: XLoadHandler | null = XLoad({
                    description: "小图标加载",
                    iconSize: "small",
                });
                smallLoad?.show(targetRef.value);
                setTimeout(() => smallLoad?.destroy(), 1000);
            },
            mediumScrollLoad() {
                const mediumLoad: XLoadHandler | null = XLoad({
                    description: "大图标加载",
                    iconSize: "medium",
                });
                mediumLoad?.show(targetRef.value);
                setTimeout(() => mediumLoad?.destroy(), 1000);
            },
            largeScrollLoad() {
                const largeLoad: XLoadHandler | null = XLoad({
                    description: "大大图标加载",
                    iconSize: "large",
                });
                largeLoad?.show(targetRef.value);
                setTimeout(() => largeLoad?.destroy(), 1000);
            }
        };
    },
});
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>加载中：</p>
        <p style="display: flex; justify-content: space-around">
            <x-button @click="fullScrollLoad">全屏加载</x-button>
            <x-button @click="targetScrollLoad">在目标处加载</x-button>
            <x-button @click="targetScrollLoadClose" type="success"
                >关闭在目标处加载</x-button
            >
            <x-button @click="targetScrollLoadDestroy" type="error"
                >销毁在目标处加载</x-button
            >
            <x-button @click="nonTextScrollLoad" type="warning"
                >无文字加载</x-button
            >

            <x-button @click="smallScrollLoad" type="success"
                >小图标</x-button
            >
            <x-button @click="mediumScrollLoad" type="warning"
                >大图标</x-button
            >
            <x-button @click="largeScrollLoad" type="error"
                >大大图标</x-button
            >
        </p>
        <div style="border: 1px solid #aaa; height: 150px" ref="targetRef">
            Load目标
        </div>
    </div>
</template>
