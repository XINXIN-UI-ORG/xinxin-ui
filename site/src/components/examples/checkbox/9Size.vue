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
    <x-checkbox v-model:checked="checkboxValue" size="small">陌上桑</x-checkbox>
    &nbsp;
    <x-checkbox v-model:checked="checkboxValue" size="normal">乌夜啼</x-checkbox>
    &nbsp;
    <x-checkbox v-model:checked="checkboxValue" size="large">梁甫吟</x-checkbox>
</template>