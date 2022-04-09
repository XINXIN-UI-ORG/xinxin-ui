<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue,
        };
    },
})
</script>
<template>
    <x-radio v-model="radioValue" value="1">
        带描述
        <template #description>
            如果label满足不了你，那加一段描述吧。
        </template>
    </x-radio>
</template>