<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            defaultClose() {
                XMessage("默认时间关闭");
            },
            oneSecondClose() {
                XMessage({
                    message: "消息1s后关闭",
                    duration: 1000
                });
            },
            fiveSecondClose() {
                XMessage({
                    message: "消息5s后关闭",
                    duration: 5000
                });
            },
            tenSecondClose() {
                XMessage({
                    message: "消息10s后关闭",
                    duration: 10000
                });
            },
        };
    },
})
</script>
<template>
    <x-button @click="defaultClose">默认时间关闭</x-button>
    <x-button @click="oneSecondClose">1s后关闭</x-button>
    <x-button @click="fiveSecondClose">5s关闭</x-button>
    <x-button @click="tenSecondClose">10s关闭</x-button>
</template>