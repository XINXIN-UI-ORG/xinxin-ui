<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        let radioValue = ref<number>(0);
        return {
            radioValue,
            changeEvent(value: number) {
                XMessage("change事件触发，当前值为：" + value);
            }
        };
    },
})
</script>
<template>
    <x-radio-group name="radio group" v-model="radioValue" @change="changeEvent">
        <x-radio :value="0">Group 0</x-radio>
        <x-radio :value="1">Group 1</x-radio>
        <x-radio :value="2">Group 2</x-radio>
    </x-radio-group>
</template>