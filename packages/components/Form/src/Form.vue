<script lang="ts">
import { defineComponent } from "vue";
import { generateClassName } from "@xinxin-ui/utils";

export default defineComponent({
    name: "x-form",
    setup() {
        let gcn = generateClassName('form');

        return {
            gcn,
        };
    },
});
</script>
<template>
    <div
        :class="[
            gcn.base(),
        ]"
    >
        <slot></slot>
    </div>
</template>