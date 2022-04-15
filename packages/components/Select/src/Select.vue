<script lang="ts">
import { defineComponent } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";

export default defineComponent({
    name: "x-select",
    setup() {
        let gcn = generateClassName("select");
        return {
            gcn,
        };
    },
})
</script>
<template>
    <div
        :class="[
            gcn.base(),
        ]"
    >
        select 组件
    </div>
</template>