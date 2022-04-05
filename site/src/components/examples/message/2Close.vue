><script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            closeable() {
                XMessage({
                    message: "显示关闭按钮",
                    duration: 10000,
                    closable: true
                });
            }
        };
    },
})
</script>
<template>
    <x-button @click="closeable">显示关闭按钮</x-button>
</template>