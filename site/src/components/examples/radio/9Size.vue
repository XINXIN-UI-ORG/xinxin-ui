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
    <x-radio v-model="radioValue" value="0" size="small">战城南</x-radio>
    &nbsp;
    <x-radio v-model="radioValue" value="1" size="normal">北风行</x-radio>
    &nbsp;
    <x-radio v-model="radioValue" value="2" size="large">襄阳歌</x-radio>
</template>