<script lang="ts">
import { defineComponent } from "vue";
import XMessage from "..";
import { Rocket } from "xinxin-icons";

export default defineComponent({
    setup() {
        let InfoMessage = function () {
            XMessage("Info提示");
        };
        return {
            InfoMessage,
            SuccessMessage() {
                XMessage({
                    message: "Success提示",
                    type: "success",
                    duration: 10000,
                    closable: true,
                    onClose() {
                        console.log(111);
                    },
                });
            },
            WarningMessage() {
                XMessage({
                    message: "Warning提示",
                    type: "warning",
                });
            },
            ErrorMessage() {
                XMessage({
                    message: "Error提示",
                    type: "error",
                });
            },
            IconMessage() {
                XMessage({
                    message: "Error提示",
                    type: "error",
                    closable: true,
                    icon: Rocket,
                });
            },
        };
    },
    components: { Rocket },
});
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>消息提示：</p>
        <p style="display: flex; justify-content: space-around">
            <x-button @click="InfoMessage">Info消息提示</x-button>
            <x-button @click="SuccessMessage" type="success"
                >Success消息提示</x-button
            >
            <x-button @click="WarningMessage" type="warning"
                >Warning消息提示</x-button
            >
            <x-button @click="ErrorMessage" type="error"
                >Error消息提示</x-button
            >
            <x-button @click="IconMessage">
                <template #pre-icon>
                    <Rocket />
                </template>
                自定义图标
            </x-button>
        </p>
    </div>
</template>
