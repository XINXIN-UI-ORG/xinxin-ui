<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            checkboxValue: ref([]),
        };
    },
})
</script>
<template>
    <x-checkbox-group v-model="checkboxValue" size="large">
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
    </x-checkbox-group>
    <br><br>
    <x-checkbox-group v-model="checkboxValue" size="normal">
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
    </x-checkbox-group>
    <br><br>
    <x-checkbox-group v-model="checkboxValue" size="small">
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
    </x-checkbox-group>
    <br><br>
    <x-checkbox-group v-model="checkboxValue" disabled>
        <x-checkbox-button value="0">独坐敬亭山</x-checkbox-button>
        <x-checkbox-button value="1">望天门山</x-checkbox-button>
        <x-checkbox-button value="2">侠客行</x-checkbox-button>
    </x-checkbox-group>
</template>