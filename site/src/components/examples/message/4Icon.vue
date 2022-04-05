<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";
import { Rocket } from "xinxin-icons";

export default defineComponent({
    setup() {
        return {
            messageIcon() {
                XMessage({
                    message: "自定义消息图标",
                    type: "error",
                    icon: Rocket, 
                });
            },
        };
    },
    components: {
        Rocket
    },
})
</script>
<template>
    <x-button @click="messageIcon" type="error">
        <template #pre-icon>
            <Rocket />
        </template>
        设置消息图标
    </x-button>
</template>