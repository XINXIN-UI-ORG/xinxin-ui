<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
</script>
<template>
    <x-radio v-model="radioValue" value="0">Option 0</x-radio>
    &nbsp;
    <x-radio v-model="radioValue" value="1">Option 1</x-radio>
</template>