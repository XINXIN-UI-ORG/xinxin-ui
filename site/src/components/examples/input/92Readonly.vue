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
    <x-input placeholder="只能看不能写" v-model="inputValue" readonly />
</template>