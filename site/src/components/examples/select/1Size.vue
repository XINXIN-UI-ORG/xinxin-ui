<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            small: ref(""),
            normal: ref(""),
            large: ref(""),
            options: [
                {
                    label: "古风 其十九",
                    value: "1"
                },
                {
                    label: "送别得书字",
                    value: "2"
                },
                {
                    label: "庐山谣寄卢侍御虚舟",
                    value: "3"
                },
            ],
        };
    },
})
</script>
<template>
    <x-select
        :options="options"
        placeholder="Small"
        v-model="small"
        block
        size="small"
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Normal"
        v-model="normal"
        block
        size="normal"
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Large"
        v-model="large"
        block
        size="large"
    >
    </x-select>
</template>