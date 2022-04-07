<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad, XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        let targetRef = ref<HTMLDivElement>();
        let load = XLoad({
            description: "加载中..."
        });

        return {
            targetRef,
            loadOnTarget() {
                load?.show(targetRef.value);
            },
            close() {
                load?.close();
            },
            destory() {
                load?.destroy(() => {
                    XMessage("销毁成功，无法再调用show方法");
                });
            },
        };
    },
})
</script>
<template>
    <x-button type="success" @click="loadOnTarget">加载</x-button>
    <x-button type="warning" @click="close">关闭</x-button>
    <x-button type="error" @click="destory">销毁</x-button>
    <div class="target" ref="targetRef">
        等待数据展示
    </div>
</template>
<style scoped>
.target {
    width: 100%;
    height: 260px;
    line-height: 260px;
    border: 1px solid #EBEEF5;
    margin-top: 10px;
    border-radius: 4px;
    text-align: center;
}
</style>