<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let groupValue = ref(['0', '1']);
        return {
            groupValue,
        };
    },
})
</script>
<template>
    <x-checkbox-group v-model="groupValue">
        <x-checkbox value="0">独坐敬亭山</x-checkbox>
        <x-checkbox value="1">望天门山</x-checkbox>
        <x-checkbox value="2">侠客行</x-checkbox>
    </x-checkbox-group>
</template>