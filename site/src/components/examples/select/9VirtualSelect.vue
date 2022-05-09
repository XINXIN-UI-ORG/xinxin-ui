<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let options = [] as any;
        for (let i = 0; i < 1000; i++) {
            options.push({
                label: "襄阳歌-李白" + i,
                value: i,
            });
        }
        return {
            value: ref("1"),
            options,
        };
    },
});
</script>
<template>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="value"
        filterable
    >
    </x-select>
</template>