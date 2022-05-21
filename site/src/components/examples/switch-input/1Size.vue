<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
            value2: ref<boolean>(false),
        };
    },
});
</script>
<template>
    <x-switch v-model="value" size="small"></x-switch>
    &nbsp;
    <x-switch v-model="value" size="normal"></x-switch>
    &nbsp;
    <x-switch v-model="value" size="large"></x-switch>
</template>