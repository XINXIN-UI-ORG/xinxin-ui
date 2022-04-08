<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let inputValue = ref("");
        return {
            inputValue
        };
    },
})
</script>
<template>
    <x-number-input placeholder="基础使用" block v-model="inputValue" />
</template>