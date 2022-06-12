<script lang="ts">
import { defineComponent } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { useForm } from "./form";

export default defineComponent({
    name: "x-form",
    setup() {
        let gcn = generateClassName('form');
        useForm();

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