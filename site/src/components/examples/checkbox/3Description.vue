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
    <x-checkbox v-model:checked="checkboxValue">
        菩萨蛮·举头忽见衡阳雁
        <template #description>
            <p>举头忽见衡阳雁。千声万字情何限。</p>
            <p>叵耐薄情夫。一行书也无。</p>
            <p>泣归香阁恨。和泪掩红粉。</p>
            <p>待雁却回时。也无书寄伊。</p>
        </template>
    </x-checkbox>
</template>