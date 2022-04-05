<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            closeCallback() {
                XMessage({
                    message: "消息关闭回调",
                    onClose() {
                        XMessage({
                            message: "消息被销毁",
                            type: "warning"
                        });
                    }
                });
            }
        };
    },
})
</script>
<template>
    <x-button @click="closeCallback">关闭回调</x-button>
</template>