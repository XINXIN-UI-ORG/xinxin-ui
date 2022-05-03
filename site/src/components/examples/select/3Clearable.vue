<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref(0),
            options: [
                {
                    label: "襄阳歌-李白",
                    value: 1
                },
                {
                    label: "采莲曲-李白",
                    value: 2
                },
                {
                    label: "石鼓歌-韩愈",
                    value: 3,
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: 4
                },
            ],
        };
    },
})
</script>
<template>
    <x-select
        :options="options"
        placeholder="Clearable"
        v-model="value"
        clearable
    >
    </x-select>
</template>