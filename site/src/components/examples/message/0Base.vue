<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            InfoMessage() {
                XMessage({
                    message: "info类型消息提示",
                    type: "info"
                });
            },
            SuccessMessage() {
                XMessage({
                    message: "success类型消息提示",
                    type: "success"
                });
            },
            WarningMessage() {
                XMessage({
                    message: "warning类型消息提示",
                    type: "warning"
                });
            },
            ErrorMessage() {
                XMessage({
                    message: "error类型消息提示",
                    type: "error"
                });
            },
        };
    },
})
</script>
<template>
    <x-button @click="InfoMessage" type="info">Info消息提示</x-button>
    <x-button @click="SuccessMessage" type="success">Success消息提示</x-button>
    <x-button @click="WarningMessage" type="warning">Warning消息提示</x-button>
    <x-button @click="ErrorMessage" type="error">Error消息提示</x-button>
</template>