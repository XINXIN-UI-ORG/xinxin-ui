<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<string>("金陵酒肆留别"),
        };
    },
});
</script>
<template>
    <x-switch
        v-model="value"
        active-value="听蜀僧浚弹琴"
        inactive-value="金陵酒肆留别"
    ></x-switch>
</template>