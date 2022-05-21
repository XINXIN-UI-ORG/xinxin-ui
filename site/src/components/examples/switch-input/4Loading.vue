<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
        };
    },
});
</script>
<template>
    <x-switch
        v-model="value"
        disabled
    >
    </x-switch>
</template>