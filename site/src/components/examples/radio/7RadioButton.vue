<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
</script>
<template>
    <x-radio-group name="radio button" v-model="radioValue">
        <x-radio-button value="0">
            静夜思
        </x-radio-button>
        <x-radio-button value="1">
            关山月
        </x-radio-button>
        <x-radio-button value="2">
            蜀道难
        </x-radio-button>
    </x-radio-group>
</template>