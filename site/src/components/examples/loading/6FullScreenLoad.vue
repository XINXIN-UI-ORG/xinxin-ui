<script lang="ts">
import { defineComponent, ref } from "vue";
import { XLoad } from "xinxin-ui";

export default defineComponent({
    setup() {
        let load = XLoad({
            description: "全屏加载...",
            iconSize: "large"
        });

        return {
            loadOnFullScreen() {
                load?.show();
                setTimeout(() => {
                    load?.close();
                }, 3000);
            }
        };
    },
})
</script>
<template>
    <x-button type="warning" @click="loadOnFullScreen">全屏加载</x-button>
</template>