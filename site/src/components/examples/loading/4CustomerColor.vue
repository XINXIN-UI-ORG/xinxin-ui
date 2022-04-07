<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad } from "xinxin-ui";

export default defineComponent({
    setup() {
        let targetRef = ref<HTMLDivElement>();
        let load = XLoad({
            description: "加载中...",
            color: "#0077fa"
        });

        return {
            targetRef,
            loadOnTarget() {
                load?.show(targetRef.value);
                setTimeout(() => {
                    load?.destroy();
                    targetRef.value!.textContent = "数据请求成功，展示数据";
                }, 3000);
            }
        };
    },
})
</script>
<template>
    <x-button type="success" @click="loadOnTarget">在目标处加载</x-button>
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