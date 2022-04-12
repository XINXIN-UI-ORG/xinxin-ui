<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            c1: ref(false),
            c2: ref(false),
        };
    },
})
</script>
<template>
    <x-checkbox v-model:checked="c1">
        望天门山
        <template #description>
            <p>天门中断楚江开，碧水东流至此回。</p>
            <p>两岸青山相对出，孤帆一片日边来。</p>
        </template>
    </x-checkbox>
    <x-checkbox v-model:checked="c2">
        峨眉山月歌
        <template #description>
            <p>峨眉山月半轮秋，影入平羌江水流。</p>
            <p>夜发清溪向三峡，思君不见下渝州。</p>
        </template>
    </x-checkbox>
</template>