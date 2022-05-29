<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            value: ref<string>("金陵酒肆留别"),
            change(value: string) {
                XMessage(value);
            },
        };
    },
});
</script>
<template>
    <x-switch
        v-model="value"
        active-value="听蜀僧浚弹琴"
        inactive-value="金陵酒肆留别"
        @change-value="change"
    ></x-switch>
</template>