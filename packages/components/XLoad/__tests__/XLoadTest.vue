<script lang="ts">
import { defineComponent, ref } from "vue";
import XLoad, { XLoadHandler } from "..";

export default defineComponent({
    setup() {
        let targetRef = ref();
        const fullScreenLoad: XLoadHandler | null = XLoad();
        const targetLoad: XLoadHandler | null = XLoad({
            description: "在目标上加载...",
        });
        return {
            targetRef,
            fullScrollLoad() {
                fullScreenLoad?.show();
                setTimeout(() => fullScreenLoad?.destroy(), 1000);
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
        </p>
        <div style="border: 1px solid #aaa; height: 150px" ref="targetRef">
            Load目标
        </div>
    </div>
</template>
