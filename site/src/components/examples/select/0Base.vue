<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref("1"),
            options: [
                {
                    label: "襄阳歌",
                    value: "1"
                },
                {
                    label: "采莲曲",
                    value: "2"
                },
                {
                    label: "客中行",
                    value: "3"
                }
            ],
        };
    },
})
</script>
<template>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="value"
    >
    </x-select>

    {{value}}

    <x-button @click="value = '20'"></x-button>
</template>