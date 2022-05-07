<script lang="ts">
import { defineComponent, ref } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            value: ref("1"),
            multipleValue: ref([]),
            options: [
                {
                    label: "襄阳歌-李白",
                    value: "1"
                },
                {
                    label: "采莲曲-李白",
                    value: "2"
                },
                {
                    label: "石鼓歌-韩愈",
                    value: "3",
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: "4"
                },
            ],
            focus(value: string) {
                XMessage("focus事件触发!" + value);
            },
            blur(value: string) {
                XMessage("blur事件触发!" + value);
            },
        };
    },
})
</script>
<template>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="value"
        @focus="focus"
        @blur="blur"
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="multipleValue"
        multiple
        @focus="focus"
        @blur="blur"
    >
    </x-select>
</template>