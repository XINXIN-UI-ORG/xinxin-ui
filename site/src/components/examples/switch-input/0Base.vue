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
    <x-switch v-model="value"></x-switch>
    &nbsp;
    <x-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
    >
    </x-switch>
</template>