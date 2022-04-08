<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let inputValue = ref("");
        return {
            inputValue,
        };
    },
})
</script>
<template>
    <x-input placeholder="请输入" v-model="inputValue" block />
</template>