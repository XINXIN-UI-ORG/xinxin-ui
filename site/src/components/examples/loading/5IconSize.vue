<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad } from "xinxin-ui";

export default defineComponent({
    setup() {
        let targetRef = ref<HTMLDivElement>();
        let smallLoad = XLoad({
            description: "加载中...",
            iconSize: "small"
        });
        let mediumLoad = XLoad({
            description: "加载中...",
            iconSize: "medium"
        });
        let largeLoad = XLoad({
            description: "加载中...",
            iconSize: "large"
        });

        return {
            targetRef,
            smallLoad() {
                smallLoad?.show(targetRef.value);
                setTimeout(() => {
                    smallLoad?.close();
                }, 1000);
            },
            mediumLoad() {
                mediumLoad?.show(targetRef.value);
                setTimeout(() => {
                    mediumLoad?.close();
                }, 1000);
            },
            largeLoad() {
                largeLoad?.show(targetRef.value);
                setTimeout(() => {
                    largeLoad?.close();
                }, 1000);
            }
        };
    },
})
</script>
<template>
    <x-button type="info" @click="smallLoad">small</x-button>
    <x-button type="success" @click="mediumLoad">medium</x-button>
    <x-button type="warning" @click="largeLoad">large</x-button>
    <div class="target" ref="targetRef">
        等待数据展示
    </div>
</template>
<style scoped>
.target {
    width: 100%;
    height: 260px;
    line-height: 260px;
    border: 1px solid #aaa;
    margin-top: 10px;
    border-radius: 4px;
    text-align: center;
}
</style>