<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let checkboxValue = ref(false);
        return {
            checkboxValue,
        };
    },
})
</script>
<template>
    <x-checkbox v-model:checked="checkboxValue" label="复选框"></x-checkbox>
    &nbsp;
    <x-checkbox v-model:checked="checkboxValue">复选框在slot</x-checkbox>
</template>