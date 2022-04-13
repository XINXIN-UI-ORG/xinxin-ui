<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        let groupValue = ref([]);
        return {
            groupValue,
            change(change: string[]) {
                XMessage("[" + change + "]");
            }
        };
    },
})
</script>
<template>
    <x-checkbox-group v-model="groupValue" name="按钮组禁用" @change="change">
        <x-checkbox value="独坐敬亭山">独坐敬亭山</x-checkbox>
        <x-checkbox value="望天门山">望天门山</x-checkbox>
        <x-checkbox value="侠客行">侠客行</x-checkbox>
    </x-checkbox-group>
</template>
